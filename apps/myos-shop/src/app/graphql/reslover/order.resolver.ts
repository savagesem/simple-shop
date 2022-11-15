import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { CheckoutInput } from '../input/checkout.input';
import { Inject } from '@nestjs/common';
import { OrderService } from '../../service/order.service';

@Resolver()
export class OrderResolver {
  @Inject(OrderService)
  private readonly service: OrderService;

  @Mutation(() => Int)
  public checkout(
    @Args('input', { type: () => CheckoutInput }) input: CheckoutInput
  ) {
    return this.service.createOrder(input);
  }
}
