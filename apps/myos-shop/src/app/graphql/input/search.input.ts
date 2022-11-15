import { Field, InputType } from '@nestjs/graphql';
import { ProductSearchFieldEnum } from '../enum/product-search-field.enum';

@InputType()
export class SearchInput {
  @Field(() => ProductSearchFieldEnum, {
    defaultValue: ProductSearchFieldEnum.Title,
  })
  public field: ProductSearchFieldEnum;

  @Field(() => String)
  public value: string;
}
