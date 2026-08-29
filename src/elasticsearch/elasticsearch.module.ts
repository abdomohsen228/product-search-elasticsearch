import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/product.entity';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
