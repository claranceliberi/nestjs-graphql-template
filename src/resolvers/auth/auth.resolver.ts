import { Auth } from '../../models/auth.model';
import { Token } from '../../models/token.model';
import { LoginInput } from './dto/login.input';
import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { AuthService } from '../../services/auth.service';
import { SignupInput } from './dto/signup.input';
import { User } from 'src/models/user.model';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UseGuards, Headers, Req, Request, Response } from '@nestjs/common';
import { GqlAuthResponseStatus } from 'src/models/auth-response-status-gql.model';
import { UserEntity } from 'src/decorators/user.decorator';
import { ResponseBoolean } from 'src/models/responseBoolean';

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) { }

  @Mutation((returns) => Auth)
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase();
    const { accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation((returns) => Auth)
  async login(@Args('data') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(
      email.toLowerCase(),
      password
    )

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation((returns) => ResponseBoolean)
  async changeForgotPassword(@Args('email') email: string) {
    const data = await this.auth.forgotPassword(email)
    return {
      status: data,
    };
  }

  @Mutation((returns) => Token)
  async changePasswordwithEmail(@Args('token') token: string, @Args('password') password: string) {
    return await this.auth.changePassword(token, password);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => GqlAuthResponseStatus)
  async signOut(@Context('req') req) {
    console.log(req.headers);
    const tokenNew = req.headers.authorization.split(' ')[1];
    if (this.auth.signOut(tokenNew)) {
      return {
        status: 'error',
      };
    } else {
      return {
        status: 'error',
      };
    }
    // Basarisiz token dogrulamasinda hata firlatmasi gerekiyor
  }


  @Mutation((returns) => Token)
  async refreshToken(@Args('token') token: string) {
    return this.auth.refreshToken(token);
  }


  @UseGuards(GqlAuthGuard)
  @ResolveField('user', (of) => User)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
