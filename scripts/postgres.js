const { GenericContainer, Network } = require('testcontainers');

const DB_PORT = 5433;
const DB_NAME = 'myos';
const DB_USER = 'postgres';
const DB_PASSWORD = 'postgres';

let dbContainer;

const serviceName = 'postgres';

async function startDb(network, port, debug = true) {
  console.log('Starting', serviceName, '...');

  dbContainer = await new GenericContainer('postgres:12.8')
    .withEnvironment({
      POSTGRES_USER: DB_USER,
      POSTGRES_PASSWORD: DB_PASSWORD,
      POSTGRES_DB: DB_NAME,
    })
    .withExposedPorts({ container: 5432, host: port })

    .start();

  const stream = await dbContainer.logs();
  stream
    .on('data', (line) => debug && console.log(line))
    .on('err', (line) => console.error(line));

  console.log(`${serviceName} started on port ${port}`);
}

const start = async (port = DB_PORT, debug = true) => {
  const network = await new Network().start();
  await startDb(network, port, debug);
};

const stop = async () => {
  await dbContainer.stop();
};

module.exports = {
  start,
  stop,
};
