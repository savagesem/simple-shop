import sql from './db';
import { Injectable } from '@nestjs/common';
import { ProductInput } from '../graphql/input/product.input';

export interface ProductEntity {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
}

@Injectable()
export class ProductRepository {
  private getWhere(input: ProductInput) {
    return sql`where ${sql(input.search.field)} like ${
      '%' + input.search.value + '%'
    }`;
  }

  public findAll(input: ProductInput) {
    return sql<ProductEntity[]>`
        SELECT * FROM product
        ${this.getWhere(input)}
        order by price desc
    `;
  }
}
