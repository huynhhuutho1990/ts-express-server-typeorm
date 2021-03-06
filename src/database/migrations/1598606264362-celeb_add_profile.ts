import { MigrationInterface, QueryRunner } from 'typeorm';

export class celebAddProfile1598606264362 implements MigrationInterface {
  name = 'celebAddProfile1598606264362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "celeb" ADD "profile" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "celeb" DROP COLUMN "profile"`);
  }
}
