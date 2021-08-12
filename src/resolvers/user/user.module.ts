import { PrismaModule } from './../../prisma/prisma.module';
import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { PasswordService } from '../../services/password.service';
import { RedisModule } from 'src/utils/redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule],
  providers: [UserResolver, UserService, PasswordService],
})
export class UserModule { }
