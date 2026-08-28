import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/product.entity';
import { Repository } from 'typeorm/repository/Repository';
import { GetProductService } from './product.get';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly getProductService: GetProductService,
  ) {}
  public async fetchAndSaveProducts(): Promise<ProductEntity[]> {
    return this.getProductService.fetchAndSaveProducts();
  }
  public async searchProducts(
    query: string,
  ): Promise<{ products: ProductEntity[]; total: number }> {
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
      products,
      total: products.length,
    };
  }
}
