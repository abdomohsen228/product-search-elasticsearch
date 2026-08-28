import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/product.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ElasticsearchService } from 'src/elasticsearch/elasticsearch.service';
import { GetProductService } from './product.get';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly getProductService: GetProductService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  public async fetchAndSaveProducts(): Promise<ProductEntity[]> {
    return this.getProductService.fetchAndSaveProducts();
  }

  public async searchProducts(query: string): Promise<{
    products: ProductEntity[];
    total: number;
    executionTime: number;
  }> {
    const count = await this.productRepository.count();
    if (count === 0) {
      await this.fetchAndSaveProducts();
    }
    const startTime = performance.now();

    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.title ILIKE :query', { query: `%${query}%` })
      .orWhere('product.description ILIKE :query', { query: `%${query}%` })
      .getMany();
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Search query executed in ${executionTime} milliseconds`);
    return {
      executionTime: Number(executionTime.toFixed(2)),
      products,
      total: products.length,
    };
  }

  public async searchElasticsearch(query: string): Promise<{
    products: ProductEntity[];
    total: number;
    executionTime: number;
  }> {
    const startTime = performance.now();
    const trimmedQuery = query?.trim() ?? '';

    if (!trimmedQuery) {
      return {
        executionTime: 0,
        products: [],
        total: 0,
      };
    }

    const client = this.elasticsearchService.getClient();
    const response = (await client.search({
      index: 'products',
      query: {
        multi_match: {
          query: trimmedQuery,
          fields: ['title', 'description'],
        },
      },
    })) as any;

    const products = ((response?.hits?.hits ?? []) as any[]).map(
      (hit: any) => hit._source as ProductEntity,
    );

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(
      `Elasticsearch search executed in ${executionTime} milliseconds`,
    );

    return {
      executionTime: Number(executionTime.toFixed(2)),
      products,
      total: products.length,
    };
  }
}
