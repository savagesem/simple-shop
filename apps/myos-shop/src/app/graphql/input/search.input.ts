import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchInput {
  @Field(() => String)
  public field: 'title' | 'description';

  @Field(() => String)
  public value: string;
}
