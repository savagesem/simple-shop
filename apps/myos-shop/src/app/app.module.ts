import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { ProductService } from './service/product.service';
import { ProductResolver } from './graphql/reslover/product.resolver';
import { ProductRepository } from './repository/product.repository';
import { OrderService } from './service/order.service';
import { OrderResolver } from './graphql/reslover/order.resolver';
import { OrderRepository } from './repository/order.repository';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    ProductService,
    ProductResolver,
    ProductRepository,
    OrderService,
    OrderResolver,
    OrderRepository,
  ],
})
export class AppModule {}
