import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1623505309294 implements MigrationInterface {
    name = 'Test1623505309294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1fd475a11dfd4d9fb1c96523dc8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_1fd475a11dfd4d9fb1c96523dc8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "shopsId"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-12 15:55:09.218234'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "shopsId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_1fd475a11dfd4d9fb1c96523dc8" UNIQUE ("shopsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1fd475a11dfd4d9fb1c96523dc8" FOREIGN KEY ("shopsId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
