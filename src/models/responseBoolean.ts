import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty } from 'class-validator';

@ObjectType()
export class ResponseBoolean {
    @Field()
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}