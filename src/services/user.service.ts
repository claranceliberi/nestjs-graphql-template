import { PrismaService } from './../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from './password.service';
import { ChangePasswordInput } from '../resolvers/user/dto/change-password.input';
import { UpdateUserInput } from '../resolvers/user/dto/update-user.input';
import { bool } from 'aws-sdk/clients/signer';
import { RedisService } from 'src/utils/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private redis: RedisService
  ) { }

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }

  async accountVerify(token: string, userId: string): Promise<Boolean> {
    const data = this.redis.get(token).then((res) => {
      if (res == userId) {
        this.redis.delete(token)
      }
      return res == userId
    })
    if (data) {
      await this.prisma.user.update({ data: { isApproved: true }, where: { id: userId } })
      return true;
    } else {
      return false;
    }
  }
}
