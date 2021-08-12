import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupInput {

  @Field({ nullable: false, description: 'user email' })
  @IsEmail()
  email: string;

  @Field({ nullable: false, description: 'user passwrord' })
  @MinLength(8)
  password: string;


  @Field({ nullable: false, description: 'user firstname' })
  @IsNotEmpty()
  firstname: string;

  @Field({ nullable: false, description: 'user lastname' })
  @IsNotEmpty()
  lastname: string;

  @Field({ nullable: false, description: 'user username' })
  @IsNotEmpty()
  username: string;


}
