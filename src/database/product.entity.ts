import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  category!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  discountPercentage!: number;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
  })
  rating!: number;

  @Column()
  stock!: number;

  @Column('text', { array: true, default: '{}' })
  tags!: string[];

  @Column({ nullable: true })
  brand!: string;

  @Column({ unique: true })
  sku!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  weight!: number;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  dimensions!: {
    width: number;
    height: number;
    depth: number;
  };

  @Column({ nullable: true })
  warrantyInformation!: string;

  @Column({ nullable: true })
  shippingInformation!: string;

  @Column({ nullable: true })
  availabilityStatus!: string;

  @Column({
    type: 'jsonb',
    default: () => "'[]'",
  })
  reviews!: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];

  @Column({ nullable: true })
  returnPolicy!: string;

  @Column({ type: 'int', nullable: true })
  minimumOrderQuantity!: number;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  meta!: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}
