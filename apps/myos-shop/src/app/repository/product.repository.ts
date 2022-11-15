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
    if (!input.search) {
      return sql``;
    }
    return sql`where ${sql(input.search.field)} like ${
      '%' + input.search.value + '%'
    }`;
  }

  private getPriceOrder(order: 'asc' | 'desc') {
    if (order === 'asc') {
      return sql`
            ORDER BY price asc
        `;
    }
    return sql`
            ORDER BY price desc
        `;
  }

  public findAll(input: ProductInput) {
    const offset = (input.page - 1) * input.limit;

    return sql<ProductEntity[]>`
        SELECT * FROM product
        ${this.getWhere(input)}
        ${this.getPriceOrder(input.priceOrder)}
        offset ${offset}
        limit ${input.limit}
    `;
  }
}
