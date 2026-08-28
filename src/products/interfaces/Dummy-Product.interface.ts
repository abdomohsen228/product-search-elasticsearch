import { ProductEntity } from 'src/database/product.entity';
import { DeepPartial } from 'typeorm';

export interface DummyJsonProductsResponse {
  products: DeepPartial<ProductEntity>[];
}
