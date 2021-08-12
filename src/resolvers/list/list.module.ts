import { PrismaModule } from '../../prisma/prisma.module';
import { ListResolver } from './list.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [ListResolver],
})
export class ListModule { }
