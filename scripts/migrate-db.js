const postgres = require('postgres');

const migration = `
 CREATE TABLE IF NOT EXISTS PRODUCT (
   title VARCHAR(100),
   description TEXT
   price default 0,
   quantity INTEGER DEFAULT 0
   image_url TEXT
);
`;

const sql = postgres({
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'myos',
});

async function addProducts() {
  return sql`
    INSERT INTO product (title, description, price, quantity, image_url) VALUES
        ('socks', 'awesome socks buy 10', 100, 1, 'https://img.jpg'),
        ('t shirt', 't shirt size XXXL', 200, 1, 'https://img.jpg'),
        ('pants', 'old school pants', 25.99, 1, 'https://img.jpg');
    `;
}

async function migrate() {
  const res = await sql`
    CREATE TABLE IF NOT EXISTS product (
    id SERIAL,
    title VARCHAR(100),
    description TEXT,
    price FLOAT DEFAULT 0,
    quantity INTEGER DEFAULT 0,
    image_url TEXT
    );
    `;

  await addProducts();

  console.log('Migration finished', res);
}

module.exports = { migrate };
