import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1623506661691 implements MigrationInterface {
    name = 'Test1623506661691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "UQ_e8f0a5cb5967931a347c31619b6" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-12 17:01:03.900275'`);
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "UQ_e8f0a5cb5967931a347c31619b6"`);
        await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "userId"`);
    }

}
