import { PrismaService } from '../../prisma/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { ListIdArgs } from '../../models/args/list-id.args';
import { UserIdArgs } from '../../models/args/user-id.args';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { List } from '../../models/list.model';
import { ListOrder } from '../../models/inputs/list-order.input';
import { ListConnection } from 'src/models/pagination/list-connection.model';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions/';
import { CreateListInput } from './dto/createList.input';
import { UserEntity } from 'src/decorators/user.decorator';
import { User } from 'src/models/user.model';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver((of) => List)
export class ListResolver {
  constructor(private prisma: PrismaService) { }

  @Subscription((returns) => List)
  listCreated() {
    return pubSub.asyncIterator('listCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => List)
  async createList(
    @UserEntity() user: User,
    @Args('data') data: CreateListInput
  ) {
    const newList = this.prisma.list.create({
      data: {
        title: data.title,
        color: data.color,
        emoji: data.emoji,
        isShared: data.isShared,
        isActive: data.isActive,
        createdId: user.id,
        userId: user.id,
      },
    });
    pubSub.publish('listCreated', { listCreated: newList });
    return newList;
  }


  @UseGuards(GqlAuthGuard)
  @Query((returns) => ListConnection)
  async publishedLists(
    @UserEntity() user: User,
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => ListOrder,
      nullable: true,
    })
    orderBy: ListOrder
  ) {
    const lists = await findManyCursorConnection(
      (args) =>
        this.prisma.list.findMany({
          skip: skip,
          include: { user: true },
          where: {
            isActive: true,
            title: { contains: query || '' },
            userId: user.id,
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : { createdAt: 'desc' },
          ...args,
        }),
      () =>
        this.prisma.list.count({
          where: {
            isActive: true,
            title: { contains: query || '' },
            userId: user.id,
          },
        }),
      { first: (first != null && first <= 20) ? first : 20, last, before, after, }
    );
    return lists;
  }

  @Query((returns) => [List])
  userLists(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .lists({ where: { isActive: true } });

    // or
    // return this.prisma.lists.findMany({
    //   where: {
    //     published: true,
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query((returns) => List)
  async list(@Args() id: ListIdArgs) {
    return this.prisma.list.findUnique({ where: { id: id.listId } });
  }

  @ResolveField('user', of => User)
  async user(@Parent() list: List) {
    return this.prisma.list.findUnique({ where: { id: list.id } }).user();
  }
}
