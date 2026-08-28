import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { QueryDto } from './dtos/Query.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('search')
  public async searchProducts(@Query() queryDto: QueryDto) {
    console.log('Received query:', queryDto.query);
    return this.productService.searchProducts(queryDto.query);
  }
}
