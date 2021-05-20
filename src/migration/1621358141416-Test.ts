import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1621358141416 implements MigrationInterface {
    name = 'Test1621358141416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "time" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
