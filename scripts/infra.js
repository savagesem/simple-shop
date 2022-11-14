const postgres = require('./postgres');
const { migrate } = require('./migrate-db');
const start = async () => {
  await postgres.start();
  await migrate();
  setInterval(() => {}, 1 << 30);
};

start()
  .then((res) => {})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
