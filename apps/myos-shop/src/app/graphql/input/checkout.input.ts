import { Field, InputType } from '@nestjs/graphql';
import { CheckoutProductInput } from './checkout-product.input';

@InputType()
export class CheckoutInput {
  @Field(() => [CheckoutProductInput])
  public products: CheckoutProductInput[];

  @Field(() => String)
  public shippingAddress: string;
}
