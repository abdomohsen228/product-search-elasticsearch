import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1787953007146 implements MigrationInterface {
  name = 'Products1787953007146';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "category" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "discountPercentage" numeric(5,2) NOT NULL, "rating" numeric(3,2) NOT NULL, "stock" integer NOT NULL, "tags" text array NOT NULL DEFAULT '{}', "brand" character varying, "sku" character varying NOT NULL, "weight" numeric(10,2), "dimensions" jsonb, "warrantyInformation" character varying, "shippingInformation" character varying, "availabilityStatus" character varying, "reviews" jsonb NOT NULL DEFAULT '[]', "returnPolicy" character varying, "minimumOrderQuantity" integer, "meta" jsonb, CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327" UNIQUE ("sku"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
