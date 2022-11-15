# simple-shop

## About

This project is powered by nx monorepo as an easy boilerplate for nestjs applications
More info can be found here: https://nx.dev/

## Prerequisites

1. Nodejs version 16 or higher
2. Docker

## Start project

1. Run `npm install`
2. Start infrastructure `npm run start:infra`. Please do not close the terminal as we would need it for integration tests and service
3. Run integration tests `npm test`
4. Start service `npm start`
5. Open http://localhost:3333/graphql to see graphql playground


## Troubleshooting

1. Cannot start infra -> please check that docker is running
2. Port is unavailable -> project uses 5433 for docker mapping, be sure it is available
