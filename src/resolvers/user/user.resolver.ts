import { PrismaService } from './../../prisma/prisma.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from '../../models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UserService } from 'src/services/user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { List } from 'src/models/list.model';

@Resolver((of) => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
    private prisma: PrismaService
  ) { }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.userService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.userService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }

  @Mutation((returns) => Boolean)
  async accountVerify(@UserEntity() user: User, @Args('token') token: string) {
    return this.userService.accountVerify(token, user.id);
  }


  @ResolveField('lists', (of) => List)
  lists(@Parent() createdBy: User) {
    return this.prisma.user.findUnique({ where: { id: createdBy.id } }).lists();
  }
}
