import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ProductsService } from './products.service';
import { Product, ProductList } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductWhereInput } from 'prisma/generated';

@Resolver(() => Product)
export class ProductsResolver {
  logger = new Logger('ProductsResolver');
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return await this.productsService.create(createProductInput);
  }

  @Query(() => ProductList, { name: 'products' })
  async getProducts(
    @Args('take', {
      defaultValue: 10,
      type: () => Int,
      nullable: true,
      name: 'Take',
    })
    take?: number,
    @Args('skip', {
      defaultValue: 0,
      type: () => Int,
      nullable: true,
      name: 'Skip',
    })
    skip?: number,
    @Args({
      name: 'where',
      type: () => ProductWhereInput,
      nullable: true,
    })
    where?: Prisma.ProductWhereInput,
  ) {
    return await this.productsService.findAll({ skip, take, where });
  }

  @Query(() => Product, { name: 'product' })
  async getProduct(
    @Args('id', { type: () => ID, nullable: true, name: 'ID' })
    id?: string,
    @Args('name', { nullable: true, name: 'Name' })
    name?: string,
    @Args('slug', { nullable: true, name: 'Slug' })
    slug?: string,
  ) {
    return await this.productsService.findOne({ id, name, slug });
  }

  @Query(() => ProductList, { name: 'productsByCategorySlug' })
  async getProductsByCategorySlug(
    @Args('slug', { type: () => String }) categorySlug: string,
    @Args('take', {
      defaultValue: 10,
      type: () => Int,
      nullable: true,
      name: 'Take',
    })
    take?: number,
    @Args('skip', {
      defaultValue: 0,
      type: () => Int,
      nullable: true,
      name: 'Skip',
    })
    skip?: number,
  ) {
    return await this.productsService.findAllByCategorySlug({
      categorySlug,
      take,
      skip,
    });
  }

  @Query(() => ProductList, { name: 'productsByQuery' })
  async getProductsByQuery(
    @Args('query', { type: () => String }) query: string,
    @Args('take', {
      defaultValue: 10,
      type: () => Int,
      nullable: true,
      name: 'Take',
    })
    take?: number,
    @Args('skip', {
      defaultValue: 0,
      type: () => Int,
      nullable: true,
      name: 'Skip',
    })
    skip?: number,
  ) {
    return await this.productsService.findAllByQuery({
      query,
      take,
      skip,
    });
  }

  @Query(() => Product, { name: 'productById' })
  async getProductById(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.findOneById({ id });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update({
      where: { id },
      data: updateProductInput,
    });
  }

  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.remove({ id });
  }
}
