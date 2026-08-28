# Products Elasticsearch

NestJS API that stores DummyJSON products in PostgreSQL and searches them through the products module.

## Setup

```bash
npm install
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_DATABASE=products
DUMMY_JSON_URL=https://dummyjson.com/products
```

Run the migration and start the API:

```bash
npm run migration:run
npm run start:dev
```

Search products with `GET /products/search?query=phone`.

Run checks with `npm run build` or `npm test`.
