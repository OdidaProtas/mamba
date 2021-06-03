import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1622755510084 implements MigrationInterface {
    name = 'Test1622755510084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-02 13:39:21.047418'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
    }

}
