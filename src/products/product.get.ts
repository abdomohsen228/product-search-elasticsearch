import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { ProductEntity } from 'src/database/product.entity';
import { Repository } from 'typeorm';
import { DummyJsonProductsResponse } from './interfaces/Dummy-Product.interface';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class GetProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async fetchAndSaveProducts(): Promise<ProductEntity[]> {
    const url = process.env.DUMMY_JSON_URL;

    if (!url) {
      throw new Error('DUMMY_JSON_URL environment variable is not defined');
    }
    const { data } = await axios.get<DummyJsonProductsResponse>(url);
    const { products } = data; // Destructure the products array from the response
    return this.productRepository.save(products);
  }
}
