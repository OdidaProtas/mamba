import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1622630336905 implements MigrationInterface {
    name = 'Test1622630336905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "merchant" ("id" SERIAL NOT NULL, CONSTRAINT "PK_9a3850e0537d869734fc9bff5d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shop" ("id" SERIAL NOT NULL, "mame" character varying NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "location" character varying NOT NULL, "merchantId" integer, CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "variants_type_enum" AS ENUM('size', 'color')`);
        await queryRunner.query(`CREATE TABLE "variants" ("id" SERIAL NOT NULL, "type" "variants_type_enum" NOT NULL DEFAULT 'color', "variation" character varying NOT NULL, "image" character varying NOT NULL, "price" integer NOT NULL, "productId" integer, CONSTRAINT "PK_672d13d1a6de0197f20c6babb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "shopId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_items" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "cartId" integer, "productId" integer, CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rider" ("id" SERIAL NOT NULL, CONSTRAINT "PK_1ed6540e613592e2a470a162ef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "payment_status_enum" AS ENUM('pending_payment', 'payment_approved', 'payment_unsuccessful', 'processing_payment')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "status" "payment_status_enum" NOT NULL DEFAULT 'pending_payment', "description" character varying NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('super_admin', 'admin', 'customer', 'rider', 'merchant')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'customer', "dateJoined" TIMESTAMP NOT NULL DEFAULT 'now()', "emailAddress" character varying NOT NULL, "phoneNumber" integer NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "cart_status_enum" AS ENUM('empty', 'ordered', 'delivered')`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "status" "cart_status_enum" NOT NULL DEFAULT 'ordered', "customerId" integer, "riderId" integer, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "productName" character varying NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promos" ("id" SERIAL NOT NULL, CONSTRAINT "PK_ac05363b0734f3842a720d20bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_9cc6dbf177842c056889046461a" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_bdbfe33a28befefa9723c355036" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_1c4b1934c3e8c5b69b3d3d311d6" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_edd714311619a5ad09525045838" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_72679d98b31c737937b8932ebe6" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_eac3d1f269ffeb0999fbde0185b" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_5d81680bf3b78fd52b2d761c398" FOREIGN KEY ("riderId") REFERENCES "rider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_5d81680bf3b78fd52b2d761c398"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_eac3d1f269ffeb0999fbde0185b"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_72679d98b31c737937b8932ebe6"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_edd714311619a5ad09525045838"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_1c4b1934c3e8c5b69b3d3d311d6"`);
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_bdbfe33a28befefa9723c355036"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_9cc6dbf177842c056889046461a"`);
        await queryRunner.query(`DROP TABLE "promos"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TYPE "cart_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "payment_status_enum"`);
        await queryRunner.query(`DROP TABLE "rider"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "variants"`);
        await queryRunner.query(`DROP TYPE "variants_type_enum"`);
        await queryRunner.query(`DROP TABLE "shop"`);
        await queryRunner.query(`DROP TABLE "merchant"`);
    }

}
