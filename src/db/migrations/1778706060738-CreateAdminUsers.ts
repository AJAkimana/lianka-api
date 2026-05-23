import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdminUsers1778706060738 implements MigrationInterface {
  name = 'CreateAdminUsers1778706060738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admin_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "full_name" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'SUPPORT', "is_active" boolean NOT NULL DEFAULT true, "two_fa_secret" character varying, "two_fa_enabled" boolean NOT NULL DEFAULT false, "last_login_at" TIMESTAMP WITH TIME ZONE, "last_login_ip" character varying, "created_by" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dcd0c8a4b10af9c986e510b9ecc" UNIQUE ("email"), CONSTRAINT "PK_06744d221bb6145dc61e5dc441d" PRIMARY KEY ("id"), CONSTRAINT "FK_admin_users_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL, CONSTRAINT "FK_admin_users_created_by" FOREIGN KEY ("created_by") REFERENCES "admin_users"("id") ON DELETE SET NULL)`,
    );
    await queryRunner.query(
      `ALTER TABLE "roi_rates" ADD CONSTRAINT "FK_roi_rates_set_by" FOREIGN KEY ("set_by") REFERENCES "admin_users"("id") ON DELETE SET NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "kyc_documents" ADD CONSTRAINT "FK_kyc_documents_reviewed_by" FOREIGN KEY ("reviewed_by") REFERENCES "admin_users"("id") ON DELETE SET NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "deposits" ADD CONSTRAINT "FK_deposits_reviewed_by" FOREIGN KEY ("reviewed_by") REFERENCES "admin_users"("id") ON DELETE SET NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawals" ADD CONSTRAINT "FK_withdrawals_reviewed_by" FOREIGN KEY ("reviewed_by") REFERENCES "admin_users"("id") ON DELETE SET NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "withdrawals" DROP CONSTRAINT "FK_withdrawals_reviewed_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deposits" DROP CONSTRAINT "FK_deposits_reviewed_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kyc_documents" DROP CONSTRAINT "FK_kyc_documents_reviewed_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roi_rates" DROP CONSTRAINT "FK_roi_rates_set_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin_users" DROP CONSTRAINT "FK_admin_users_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin_users" DROP CONSTRAINT "FK_admin_users_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "admin_users"`);
  }
}
