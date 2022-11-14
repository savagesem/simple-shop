import * as postgres from 'postgres';

const sql = postgres({
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'myos',
});

export default sql;
