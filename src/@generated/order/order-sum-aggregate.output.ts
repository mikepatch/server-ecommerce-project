import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class OrderSumAggregate {

    @Field(() => Int, {nullable:true})
    totalAmount?: number;
}