<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">Un template
  <a href="https://nestjs.com/" target="_blank">Nest.js</a>
  pour construire rapidement le back-end de votre API
</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```
After packages installation it is necessary to create a file named .env.development in the environments directory, based on the file : environments/.env.template.

For production purpose you will need to create a file named .env.production.

You should then complete the created file.

## Running the app

```bash
# Development
$ yarn start

# Development watch mode
$ yarn start:dev

# Production mode
$ yarn start:prod
```

## Test

```bash
# Run unit tests
$ yarn test

# Run e2e tests
$ yarn test:e2e

# Run test coverage
$ yarn test:cov
```

## TypeORM

```bash
# Generate new migration
$ yarn typeorm migration:generate ./typeorm_migrations/<migration-name> -d ./typeorm_migrations/datasources/migrations-datasource.ts

# Apply migrations
$ yarn typeorm migration:run -d ./typeorm_migrations/datasources/migrations-datasource.ts

# Revert last migration applied
$ yarn typeorm migration:revert -d ./typeorm_migrations/datasources/migrations-datasource.ts

# Add migrations to migration table without applying it
$ yarn typeorm migration:run --fake -d ./typeorm_migrations/datasources/migrations-datasource.ts

# Remove migrations from migration table
$ yarn typeorm migration:revert --fake -d ./typeorm_migrations/datasources/migrations-datasource.ts
```

## Support

Nest est un projet OpenSource sous license MIT
Il peut grandir grâce aux soutient de ses sponsors.
Si vous souhaitez les rejoindre, [regardez ici](https://docs.nestjs.com/support).

## License

Nest est sous licence [MIT](MITLICENSE).
