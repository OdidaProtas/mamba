import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1623591579352 implements MigrationInterface {
    name = 'Test1623591579352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "purchasePrice"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "purchasePrice" character varying DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "retailPrice"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "retailPrice" character varying`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "quantity" character varying NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "barcode"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "barcode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "barcode"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "barcode" integer`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "retailPrice"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "retailPrice" integer`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "purchasePrice"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "purchasePrice" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-13 13:20:55.652406'`);
    }

}
