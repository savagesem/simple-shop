import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CheckoutProductInput {
  @Field(() => Int)
  public id: number;

  @Field(() => Int)
  public quantity: number;
}
