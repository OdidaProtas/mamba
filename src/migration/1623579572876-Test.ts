import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1623579572876 implements MigrationInterface {
    name = 'Test1623579572876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "purchasePrice" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "purchasePrice" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-13 11:28:55.403882'`);
    }

}
