import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1623052970686 implements MigrationInterface {
    name = 'Test1623052970686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "tagLine" character varying`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "businessPhoneNumber" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "shop_category_enum" AS ENUM('beauty_and_fashion', 'food_and_beverages', 'electronics', 'general')`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "category" "shop_category_enum" NOT NULL DEFAULT 'general'`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "logoUri" character varying`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "socialMedia" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "artik" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "store" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "shop" ALTER COLUMN "latitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shop" ALTER COLUMN "longitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-04 00:25:39.40084'`);
        await queryRunner.query(`ALTER TABLE "shop" ALTER COLUMN "longitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shop" ALTER COLUMN "latitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "store"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "artik"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "socialMedia"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "logoUri"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "shop_category_enum"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "businessPhoneNumber"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "tagLine"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "location" character varying NOT NULL`);
    }

}
