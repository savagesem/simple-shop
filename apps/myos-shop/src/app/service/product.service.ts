import { Inject, Injectable } from '@nestjs/common';
import { ProductInput } from '../graphql/input/product.input';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
  @Inject(ProductRepository)
  private readonly repo: ProductRepository;

  public async getProducts(input: ProductInput) {
    const raw = await this.repo.findAll(input);

    return raw.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      imageUrl: product.image_url,
    }));
  }

  public validateProducts(productIds: number[]){
    /*
    Here can be logic to validate that product exists in the DB
     */
  }
}
