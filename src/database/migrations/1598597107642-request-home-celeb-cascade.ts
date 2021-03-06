import { MigrationInterface, QueryRunner } from 'typeorm';

export class requestHomeCelebCascade1598597107642 implements MigrationInterface {
  name = 'requestHomeCelebCascade1598597107642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a8971b2a7b93f9d56f7547a3489"`);
    await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_926b07a7324c2f3637da8191430"`);
    await queryRunner.query(`ALTER TABLE "like_celeb" DROP CONSTRAINT "FK_fdcf92a53a3856f90bd2b392831"`);
    await queryRunner.query(`ALTER TABLE "home_celeb" DROP CONSTRAINT "FK_2e920c5503ee37f04289efab237"`);
    await queryRunner.query(`ALTER TABLE "request" ADD "accept_reject_date" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(`ALTER TABLE "request" ADD "team_notes" text`);
    await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "celeb_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_a8971b2a7b93f9d56f7547a3489" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_926b07a7324c2f3637da8191430" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "like_celeb" ADD CONSTRAINT "FK_fdcf92a53a3856f90bd2b392831" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "home_celeb" ADD CONSTRAINT "FK_2e920c5503ee37f04289efab237" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "home_celeb" DROP CONSTRAINT "FK_2e920c5503ee37f04289efab237"`);
    await queryRunner.query(`ALTER TABLE "like_celeb" DROP CONSTRAINT "FK_fdcf92a53a3856f90bd2b392831"`);
    await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_926b07a7324c2f3637da8191430"`);
    await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a8971b2a7b93f9d56f7547a3489"`);
    await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "celeb_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "team_notes"`);
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "accept_reject_date"`);
    await queryRunner.query(
      `ALTER TABLE "home_celeb" ADD CONSTRAINT "FK_2e920c5503ee37f04289efab237" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "like_celeb" ADD CONSTRAINT "FK_fdcf92a53a3856f90bd2b392831" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_926b07a7324c2f3637da8191430" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_a8971b2a7b93f9d56f7547a3489" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
