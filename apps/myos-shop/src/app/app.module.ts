import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { ProductService } from './service/product.service';
import { ProductResolver } from './graphql/reslover/product.resolver';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [AppService, ProductService, ProductResolver, ProductRepository],
})
export class AppModule {}
