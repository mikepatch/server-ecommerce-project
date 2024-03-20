import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CartItemWhereUniqueInput } from './cart-item-where-unique.input';
import { Type } from 'class-transformer';
import { CartItemUpdateWithoutProductInput } from './cart-item-update-without-product.input';

@InputType()
export class CartItemUpdateWithWhereUniqueWithoutProductInput {

    @Field(() => CartItemWhereUniqueInput, {nullable:false})
    @Type(() => CartItemWhereUniqueInput)
    where!: Prisma.AtLeast<CartItemWhereUniqueInput, 'id' | 'cartId_productId'>;

    @Field(() => CartItemUpdateWithoutProductInput, {nullable:false})
    @Type(() => CartItemUpdateWithoutProductInput)
    data!: CartItemUpdateWithoutProductInput;
}