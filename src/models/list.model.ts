import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel } from './base.model';
import { IsBoolean, IsString } from 'class-validator';

@ObjectType()
export class List extends BaseModel {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  color?: string;

  @Field({ nullable: true })
  @IsBoolean()
  isShared: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  isActive: boolean;

  @Field({ nullable: true })
  @IsString()
  emoji?: string;

  userId: User;
}
