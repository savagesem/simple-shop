const postgres = require('postgres');
const config = require('../config/config.json');

const sql = postgres(config);

async function addProducts() {
  return sql`
    INSERT INTO product (title, description, price, quantity, image_url) VALUES
        ('socks', 'awesome socks buy 10', 100, 1, 'https://img.jpg'),
        ('t shirt', 't shirt size XXXL', 200, 1, 'https://img.jpg'),
        ('pants', 'old school pants', 25.99, 1, 'https://img.jpg');
    `;
}

async function createOrderTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        shipping_address TEXT
    );
    `;

  await sql`
    CREATE TABLE IF NOT EXISTS order_product (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER
    );
    `;
}

async function createProductTable() {
  return await sql`
    CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    price FLOAT DEFAULT 0,
    quantity INTEGER DEFAULT 0,
    image_url TEXT
    );
    `;
}

async function migrate() {
  await createProductTable();
  await createOrderTable();

  await addProducts();

  console.log('Migration finished...');
}

module.exports = { migrate };
