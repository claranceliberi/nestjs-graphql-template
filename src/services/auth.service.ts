import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from '../resolvers/auth/dto/signup.input';
import { Prisma, User } from '@prisma/client';
import { Token } from '../models/token.model';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/configs/config.interface';
import { SESBody, SesService } from 'src/utils/ses';
import { RedisService } from 'src/utils/redis/redis.service';



@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private ses: SesService,
    private redis: RedisService
  ) { }

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          salt: '',
          username: payload.username,
        },
      });

      this.redis.confirmEmailLink(user.id).then((res) => {
        this.ses.sendEmail({
          to: user.email,
          subject: 'Hey hey! 👋 Welcome to Sudeb!',
          body: SESBody.CONFIRM_EMAIL,
          data: {
            username: user.username,
            name: user.firstname,
            actionurl: res
          }
        });
      });


      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      const message = `Unique constraint failed on the fields: [${e.meta.target.map(
        (elem: string) => `(${elem})`,
      )}]`;
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        if (message.includes("email")) {
          throw new ConflictException(`Email ${payload.email} already used.`);
        }

        if (message.includes("username")) {
          throw new ConflictException(`Username ${payload.username} already used.`);
        }
      } else {
        throw new Error(e);
      }
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
    });
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.user.findUnique({ where: { id } });
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload)
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      secret: this.configService.get('JWT_PRIVATE_KEY'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  async refreshToken(token: string): Promise<Token> {


    return this.jwtService.verifyAsync(token, {
      publicKey: this.configService.get('JWT_PUBLIC_KEY'),
    }).then((res) => {
      return this.generateTokens({
        userId: res.userId,
      });

    }).catch((e) => {
      throw new UnauthorizedException();
    });



  }

  // Token dogrulayarak veri cikisi icin kullanilir.
  signOut(token: string) {
    try {
      return this.jwtService.verifyAsync(token, {
        publicKey: this.configService.get('JWT_PUBLIC_KEY'),
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async forgotPassword(email: string): Promise<Boolean> {
    return this.prisma.user.findUnique({ where: { email } })
      .then((user) => {
        if (!user) {
          throw new NotFoundException(`No user found for email: ${email}`);
        }

        this.redis.resetPasswordLink(user.id).then((res) => {
          this.ses.sendEmail({
            to: user.email,
            subject: 'Hey hey! 👋 You forgot your password?',
            body: SESBody.RESET_PASSWORD,
            data: {
              username: user.username,
              name: user.firstname,
              actionurl: res
            }
          });
        });
        return true
      }).catch((e) => {
        return false
      })
  }
  async changePassword(token: string, password: string): Promise<Token> {
    await this.redis.get(token).then((res) => {
      if (res == null) {
        throw new NotFoundException('Code has expired. Please generate new code again.');
      }
    })

    let userId = ''
    const hashedPassword = await this.passwordService.hashPassword(
      password
    );


    await this.redis.get(token).then((res: string) => {
      userId = res
    })

    const user = await this.prisma.user.update({
      data: {
        password: hashedPassword,
        salt: '',
      }, where: { id: userId }
    });

    if (!user) {
      throw new Error('User not found')
    }

    this.redis.resetPasswordSecurity(user.id).then((res) => {

      this.ses.sendEmail({
        to: user.email,
        subject: 'Hey hey! 👋 Your password has been changed!',
        body: SESBody.RESET_PASSWORD,
        data: {
          name: user.firstname,
          actionurl: res
        }
      });

      this.redis.delete(token);
    });

    return this.generateTokens({
      userId: user.id,
    });

  }

}
