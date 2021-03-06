import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPaymentMethodToRequest1599793909724 implements MigrationInterface {
  name = 'addPaymentMethodToRequest1599793909724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request" ADD "payment_method" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "payment_method"`);
  }
}
