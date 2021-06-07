import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1623055288831 implements MigrationInterface {
    name = 'Test1623055288831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_9cc6dbf177842c056889046461a"`);
        await queryRunner.query(`ALTER TABLE "shop" RENAME COLUMN "merchantId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_e8f0a5cb5967931a347c31619b6"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-07 11:03:24.904297'`);
        await queryRunner.query(`ALTER TABLE "shop" RENAME COLUMN "userId" TO "merchantId"`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_9cc6dbf177842c056889046461a" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
