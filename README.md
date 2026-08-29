# Products Elasticsearch

A NestJS application that imports product data, stores it in PostgreSQL with TypeORM, and exposes search endpoints backed by both a relational database query and Elasticsearch.

## Overview

This project is designed to demonstrate two search strategies for product data:

- Database search using PostgreSQL and TypeORM
- Full-text style search using Elasticsearch

It fetches product records from a DummyJSON source, saves them to the database, and indexes them in an Elasticsearch index called `products`.

## Tech stack

- NestJS
- TypeORM
- PostgreSQL
- Elasticsearch
- TypeScript

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ recommended
- PostgreSQL running locally or in a container
- Elasticsearch running locally or accessible via URL
- npm installed

## Environment variables

Create a `.env` file in the project root with the following values:

```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
ELASTICSEARCH_URL=
```

If you use different credentials or a remote database, update the values accordingly.

## Installation

```bash
npm install
```

## Database setup

Run the TypeORM migration to create the required table structure:

```bash
npm run migration:run
```

You can also generate new migrations when needed:

```bash
npm run migration:generate -- -n YourMigrationName
```

## Run the application

Start the development server:

```bash
npm run start:dev
```

This script already runs the migration before launching the app.

## API endpoints

### Search with PostgreSQL

```http
GET /products/search?query=phone
```

Returns products matching the query in the `title` or `description` fields using a SQL-style `ILIKE` search.

### Search with Elasticsearch

```http
GET /products/elasticsearch?query=phone
```

Returns products returned by the Elasticsearch `multi_match` query against `title` and `description`.

## Useful scripts

```bash
npm run build
npm run test
npm run test:e2e
npm run lint
```

## Troubleshooting

If the app fails to start:

1. Check that PostgreSQL is running and credentials in `.env` are correct.
2. Confirm Elasticsearch is available at `ELASTICSEARCH_URL`.
3. Run the migration again:

```bash
npm run migration:run
```

4. Restart the app:

```bash
npm run start:dev
```
