import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductGql {
  @Field(() => ID)
  public id: number;

  @Field(() => String)
  public title: string;

  @Field(() => String)
  public description: string;

  @Field(() => Float)
  public price: number;

  @Field(() => Int)
  public quantity: number;

  @Field(() => String)
  public imageUrl: string;
}
