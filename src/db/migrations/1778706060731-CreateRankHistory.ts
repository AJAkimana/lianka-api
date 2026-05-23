import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRankHistory1778706060731 implements MigrationInterface {
  name = 'CreateRankHistory1778706060731';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rank_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "rank" character varying NOT NULL, "rank_level" integer NOT NULL, "achieved_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_62bae854841b76fde16ea3f840e" PRIMARY KEY ("id"), CONSTRAINT "FK_rank_history_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rank_history" DROP CONSTRAINT "FK_rank_history_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "rank_history"`);
  }
}
