# Products Elasticsearch

NestJS API that stores DummyJSON products in PostgreSQL and searches them through the products module.

## Setup

```bash
npm install
```

Create a `.env` file:

Run the migration and start the API:

```bash
npm run migration:run
npm run start:dev
```

Search products with `GET /products/search?query=phone`.

Run checks with `npm run build` or `npm test`.
