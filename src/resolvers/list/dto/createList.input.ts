import { IsNotEmpty, IsEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateListInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  emoji: string;

  @Field({ nullable: true })
  isActive: boolean;

  @Field({ nullable: true })
  isShared: boolean;

  @Field({ nullable: true })
  createdId: string;
}
