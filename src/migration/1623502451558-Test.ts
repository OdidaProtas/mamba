import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1623502451558 implements MigrationInterface {
    name = 'Test1623502451558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "shopsId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_1fd475a11dfd4d9fb1c96523dc8" UNIQUE ("shopsId")`);
        await queryRunner.query(`ALTER TABLE "product" ADD "purchasePrice" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "retailPrice" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "quantity" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "expiryDate" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "barcode" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "imageUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "isPublished" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "UQ_f0640e30fef1d175426d80dbc13" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "UQ_cf9f923701390ba1f2b3835e2d4" UNIQUE ("businessPhoneNumber")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1fd475a11dfd4d9fb1c96523dc8" FOREIGN KEY ("shopsId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1fd475a11dfd4d9fb1c96523dc8"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "UQ_cf9f923701390ba1f2b3835e2d4"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "UQ_f0640e30fef1d175426d80dbc13"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-07 12:04:19.875815'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "isPublished"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "barcode"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "expiryDate"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "retailPrice"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "purchasePrice"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_1fd475a11dfd4d9fb1c96523dc8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "shopsId"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
