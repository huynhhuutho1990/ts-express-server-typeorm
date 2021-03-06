# Typescript-Express-Server-TypeORM

This is a basic starter template for an Express.js server with a Postgres database written in TypeScript.

## Architecture

The server uses a 3-layer architecture:
- Controller Layer
- Service Layer
- Data Access Layer

### Controller Layer - /controllers

All routes are defined in the controller layer. No business logic should be included in this layer. Instead you should use the service layer for all business logic related actions.

### Service Layer - /services

This layer includes all business logic. The service layer is also the only layer that uses the data access layer.

### Data Access Layer - /repository (using Repository Typeorm)

## Other

### Config - src/config

Here you can adjust your config settings.

### Tests - src/tests

Here you store all your tests, seperated in integration-tests and unit-tests. Tests are written with Jest.

### Types - src/types

Holds .d.ts files not found on DefinitelyTyped.

### src/database/entities
Models define postgres schemas that will be used in storing and retrieving data from PostgresDB

### src/server.ts
Entry point to your express app

### Docker

Example Docker Compose files are included for the development, test & production environment.

## Technologies

TypeScript, Node.js, Postgres & Express.js, FireBase
