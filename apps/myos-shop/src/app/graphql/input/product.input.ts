import { Field, InputType, Int } from '@nestjs/graphql';
import { SearchInput } from './search.input';
import { OrderEnum } from '../enum/order.enum';

@InputType()
export class ProductInput {
  @Field(() => SearchInput, { nullable: true })
  public search?: SearchInput;

  @Field(() => OrderEnum, { defaultValue: OrderEnum.Asc })
  public priceOrder: OrderEnum;

  @Field(() => Int)
  public page: number;

  @Field(() => Int)
  public limit: number;
}
