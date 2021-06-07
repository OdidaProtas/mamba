import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1623056457686 implements MigrationInterface {
    name = 'Test1623056457686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" RENAME COLUMN "mame" TO "name"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dateJoined" SET DEFAULT '2021-06-07 11:41:54.376662'`);
        await queryRunner.query(`ALTER TABLE "shop" RENAME COLUMN "name" TO "mame"`);
    }

}
