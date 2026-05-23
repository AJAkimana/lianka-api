import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLoyaltySnapshots1778706060733 implements MigrationInterface {
  name = 'CreateLoyaltySnapshots1778706060733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "loyalty_snapshots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "date" date NOT NULL, "completed_cycles_score" numeric(5,2) NOT NULL DEFAULT '0', "redeposit_score" numeric(5,2) NOT NULL DEFAULT '0', "no_breach_score" numeric(5,2) NOT NULL DEFAULT '0', "timeframe_score" numeric(5,2) NOT NULL DEFAULT '0', "account_age_score" numeric(5,2) NOT NULL DEFAULT '0', "referral_quality_score" numeric(5,2) NOT NULL DEFAULT '0', "promotion_score" numeric(5,2) NOT NULL DEFAULT '0', "total_score" numeric(5,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ebf8b4ea60797d7850b01880ee7" PRIMARY KEY ("id"), CONSTRAINT "FK_loyalty_snapshots_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loyalty_snapshots" DROP CONSTRAINT "FK_loyalty_snapshots_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "loyalty_snapshots"`);
  }
}
