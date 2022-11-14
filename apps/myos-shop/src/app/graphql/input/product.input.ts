import { Field, InputType, Int } from '@nestjs/graphql';
import { SearchInput } from './search.input';

@InputType()
export class ProductInput {
  @Field(() => SearchInput)
  public search: SearchInput;

  @Field(() => String)
  public priceOrder: 'asc' | 'desc';

  @Field(() => Int)
  public page: number;

  @Field(() => Int)
  public limit: number;
}
