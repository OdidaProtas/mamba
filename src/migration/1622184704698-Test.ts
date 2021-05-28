import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1622184704698 implements MigrationInterface {
    name = 'Test1622184704698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mpesa_express" ("id" SERIAL NOT NULL, "phone" integer NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_eec77151cd4e2dfbfa257820470" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('super_admin', 'admin', 'customer', 'rider', 'merchant')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "user_role_enum" NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "dateJoined" TIMESTAMP NOT NULL DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dateJoined"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "mpesa_express"`);
    }

}
