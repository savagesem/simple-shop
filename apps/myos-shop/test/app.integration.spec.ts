import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import * as request from 'supertest';
import { gql } from 'apollo-server-express';
let app: INestApplication;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();

  await app.init();
});

afterAll(async () => {
  await app.close();
});

const queryData = (query: string) => {
  return request(app.getHttpServer())
    .post('/graphql')
    .set('Content-type', 'application/json')
    .send({ query });
};

describe('Application integration tests', () => {
  describe('products query', () => {
    let response;
    const query = `
      query {
        products(
          input: { page: 1, limit: 10}
        ) {
          id
          title
          description
          price
          imageUrl
          quantity
        }
      }
    `;

    beforeAll(async () => {
      response = await queryData(query);
    });

    test('response status code should be 200', () => {
      expect(response.status).toBe(200);
    });

    test('should return records from the database', () => {
      expect(response.body.data.products).toHaveLength(3);
    });

    test('results should be sorted by price ASC', () => {
      const expectedArray = [...response.body.data.products].sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        } else {
          return 0;
        }
      });
      expect(response.body.data.products).toEqual(expectedArray);
    });

    test('results should be sorted by price DESC', async () => {
      const query = `
        query {
          products(input: { page: 1, limit: 10, priceOrder: Desc }) {
            id
            title
            description
            price
            imageUrl
            quantity
          }
        }
      `;
      const response = await queryData(query);
      const expectedArray = [...response.body.data.products].sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        } else {
          return 0;
        }
      });
      expect(response.body.data.products).toEqual(expectedArray);
    });

    test('should search for record with title "pants"', async () => {
      const query = `
        query {
          products(
            input: {
              page: 1
              limit: 10
              search: { field: Title, value: "pants" }
            }
          ) {
            id
            title
            description
            price
            imageUrl
            quantity
          }
        }
      `;

      const response = await queryData(query);

      expect(response.body.data.products[0]).toMatchObject({
        title: 'pants',
      });
    });
  });
});
