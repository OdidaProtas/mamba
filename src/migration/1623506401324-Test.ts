import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1623506401324 implements MigrationInterface {
    name = 'Test1623506401324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-12 15:55:09.218234'`);
    }

}