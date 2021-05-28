import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1622226795449 implements MigrationInterface {
    name = 'Test1622226795449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "time" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mpesa_express" ("id" SERIAL NOT NULL, "phone" integer NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_eec77151cd4e2dfbfa257820470" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('super_admin', 'admin', 'customer', 'rider', 'merchant')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'customer', "dateJoined" TIMESTAMP NOT NULL DEFAULT 'now()', "emailAddress" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "mpesa_express"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
