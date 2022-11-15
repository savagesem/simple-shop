import { CheckoutInput } from '../graphql/input/checkout.input';
import sql from './db';

export class OrderRepository {
  public async createOrder(input: CheckoutInput) {
    const order = await sql.begin('read write', async (sql) => {
      const [order] = await sql`
        insert into orders (
        shipping_address
        ) values (
            ${input.shippingAddress}
        )
        RETURNING id
        `;

      const products = input.products.map((pr) => ({
        order_id: order.id,
        product_id: pr.id,
        quantity: pr.quantity,
      }));

      await sql`
        insert into order_product ${sql(products)}
        `;

      return order;
    });

    return order.id;
  }
}
