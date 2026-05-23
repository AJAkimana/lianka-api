import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentEvents1778840377779 implements MigrationInterface {
  name = 'CreatePaymentEvents1778840377779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "event_type" character varying NOT NULL, "cycle_number" integer NOT NULL, "deposit_id" uuid, "grace_end_date" TIMESTAMP WITH TIME ZONE, "redeposit_date" TIMESTAMP WITH TIME ZONE, "days_before_end" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_payment_events_id" PRIMARY KEY ("id"), CONSTRAINT "CHK_payment_events_event_type" CHECK (event_type IN ('REDEPOSIT', 'ON_TIME_REDEPOSIT', 'MISSED_REDEPOSIT')), CONSTRAINT "FK_payment_events_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE, CONSTRAINT "FK_payment_events_deposit_id" FOREIGN KEY ("deposit_id") REFERENCES "deposits"("id") ON DELETE SET NULL)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_payment_events_user_id" ON "payment_events" ("user_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_payment_events_type" ON "payment_events" ("event_type")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_payment_events_type"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_payment_events_user_id"`);
    await queryRunner.query(`DROP TABLE "payment_events"`);
  }
}
