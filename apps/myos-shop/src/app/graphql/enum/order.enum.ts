import { registerEnumType } from '@nestjs/graphql';

export enum OrderEnum {
  Asc = 'asc',
  Desc = 'desc',
}

registerEnumType(OrderEnum, { name: 'OrderEnum' });
