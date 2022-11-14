import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductGql } from '../model/product.gql';
import { ProductInput } from '../input/product.input';
import { Inject } from '@nestjs/common';
import { ProductService } from '../../service/product.service';

@Resolver()
export class ProductResolver {
  @Inject(ProductService)
  private productService: ProductService;

  @Query(() => [ProductGql])
  public products(
    @Args('input', { type: () => ProductInput }) input: ProductInput
  ): Promise<ProductGql[]> {
    return this.productService.getProducts(input);
  }
}
