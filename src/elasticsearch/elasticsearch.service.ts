import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ProductEntity } from 'src/database/product.entity';

@Injectable()
export class ElasticsearchService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL,
    });
  }

  getClient(): Client {
    return this.client;
  }
  public async indexProducts(products: ProductEntity[]) {
    const operations = products.flatMap((product) => [
      {
        index: {
          _index: 'products',
          _id: product.id.toString(),
        },
      },
      {
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        brand: product.brand,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
      },
    ]);

    await this.client.bulk({
      operations,
      refresh: true,
    });
  }
}
