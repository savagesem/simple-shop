import { Inject, Injectable } from '@nestjs/common';
import { CheckoutInput } from '../graphql/input/checkout.input';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class OrderService {
  @Inject(OrderRepository)
  private readonly repo: OrderRepository;

  private isInStock(){
    /*
    We can write logic to validate product stocks here or
    put it into stock service file
     */
  }

  public createOrder(input: CheckoutInput) {
    return this.repo.createOrder(input);
  }
}
