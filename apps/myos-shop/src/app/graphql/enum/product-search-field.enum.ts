import { registerEnumType } from '@nestjs/graphql';

export enum ProductSearchFieldEnum {
  Title = 'title',
  Description = 'description',
}

registerEnumType(ProductSearchFieldEnum, { name: 'ProductSearchFieldEnum' });
