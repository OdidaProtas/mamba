import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1623571591807 implements MigrationInterface {
    name = 'Test1623571591807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ADD "hasDelivery" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "expiryDate"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "expiryDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "expiryDate"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "expiryDate" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-12 17:04:50.434809'`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "hasDelivery"`);
    }

}
