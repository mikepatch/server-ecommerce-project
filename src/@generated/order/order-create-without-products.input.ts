import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutOrdersInput } from '../user/user-create-nested-one-without-orders.input';

@InputType()
export class OrderCreateWithoutProductsInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutOrdersInput, {nullable:false})
    user!: UserCreateNestedOneWithoutOrdersInput;
}