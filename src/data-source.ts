import 'reflect-metadata';
import * as dotenv from 'dotenv';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ProductEntity } from './database/product.entity';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',

  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || 'products',

  entities: [ProductEntity],

  migrations: [path.join(__dirname, './migrations/*.ts')],

  synchronize: false,

  extra: {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
};

export default new DataSource(dataSourceOptions);
