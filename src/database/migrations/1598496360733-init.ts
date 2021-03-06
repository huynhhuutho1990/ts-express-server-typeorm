import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1598496360733 implements MigrationInterface {
  name = 'init1598496360733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "celeb" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid, "name" character varying NOT NULL, "description" text, "photo" character varying, "thumbnail" character varying, "response_time_days" integer, "video_per_week" integer, "external_id" character varying NOT NULL, "team_notes" character varying, "date_joined" TIMESTAMP WITH TIME ZONE, "slug_url" character varying NOT NULL, "store_price_product_id" uuid, CONSTRAINT "REL_2e827b2e3631dfeb1660a2b385" UNIQUE ("user_id"), CONSTRAINT "PK_905009d455512cf02a091de707e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8badfed1a542696a696cdf39b8" ON "celeb" ("external_id") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c659007338910e418e8b4512ac" ON "celeb" ("slug_url") `);
    await queryRunner.query(
      `CREATE TABLE "explorer_celeb" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "celeb_id" uuid NOT NULL, "order" integer NOT NULL, "group_id" uuid, CONSTRAINT "PK_bbe546cab935bbd8625696c0b0f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "explorer_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying, "label" character varying, "type" character varying NOT NULL DEFAULT 'celebrity', "order" integer NOT NULL, CONSTRAINT "PK_bbe3189799caff81606da932f2f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "explorer_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "category_id" uuid NOT NULL, "order" integer NOT NULL, "group_id" uuid, CONSTRAINT "PK_441a13bbcbd2e983bc95341717d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "external_id" character varying NOT NULL, "order" integer DEFAULT 99, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_23c05c292c439d77b0de816b50" ON "category" ("name") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_38a5075b576a5f075e9ad90d4a" ON "category" ("external_id") `);
    await queryRunner.query(
      `CREATE TABLE "celeb_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "celeb_id" uuid NOT NULL, "type" character varying NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_c560a72dbfecf06dc1bf16c1350" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "celeb_social" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "celeb_id" uuid NOT NULL, "type" character varying NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_4659de573a4bb3100a253f9c269" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, "title" character varying NOT NULL, "message" character varying, "image_url" character varying, "read" boolean NOT NULL DEFAULT false, "payload" jsonb, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "occasion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "icon" character varying, "external_id" character varying NOT NULL, "order" integer DEFAULT 99, CONSTRAINT "PK_9bc2adf495b52dfe978275e9fd6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7947cc046b284a6a15070090c4" ON "occasion" ("name") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_738a2491424fff7db7e4b372c9" ON "occasion" ("external_id") `);
    await queryRunner.query(
      `CREATE TABLE "pronoun" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "external_id" character varying NOT NULL, "order" integer DEFAULT 99, CONSTRAINT "PK_beda482a526877c2fb1d30ed749" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1d9524c3f502b54ac4964e0d91" ON "pronoun" ("name") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e42b496f1c6318f6dba377ab02" ON "pronoun" ("external_id") `);
    await queryRunner.query(
      `CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "request_id" uuid NOT NULL, "celeb_id" uuid NOT NULL, "point" real NOT NULL, CONSTRAINT "REL_e8cc3e481de06636e715c56ed1" UNIQUE ("request_id"), CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3745180369294c5931c38e1cc0" ON "rating" ("request_id", "celeb_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "request_id" uuid, "url" character varying NOT NULL, "user_id" uuid NOT NULL, "celeb_id" uuid NOT NULL, "slug_url" character varying NOT NULL, CONSTRAINT "REL_d2221bb36ea3058611c2339a84" UNIQUE ("request_id"), CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a496abb52b66d2c748be30f4cf" ON "video" ("slug_url") `);
    await queryRunner.query(
      `CREATE TABLE "request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, "celeb_id" uuid NOT NULL, "request_number" character varying NOT NULL, "price" numeric NOT NULL DEFAULT 0, "display_price" numeric NOT NULL DEFAULT 0, "introduction" character varying, "instruction" text NOT NULL, "receiver_name" character varying, "buyer_email" character varying, "buyer_phone" character varying, "payment_status" character varying NOT NULL, "status" character varying NOT NULL, "pronoun_id" uuid, "occasion_id" uuid, "external_id" character varying, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d948be59537acc62e02bc8c060" ON "request" ("request_number") `);
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ae4578dcaed5adff96595e6166" ON "role" ("name") `);
    await queryRunner.query(
      `CREATE TABLE "user_notification_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "token" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_fd4c8bf87a4c5bf846c27285a24" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_6a2d032c6a760a1cd761ce2d01" ON "user_notification_token" ("token") `
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_name" character varying(100), "name" character varying, "email" character varying, "phone_number" character varying, "photo" character varying, "external_id" character varying NOT NULL, "disabled" boolean, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d34106f8ec1ebaf66f4f8609dd" ON "user" ("user_name") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d9479cbc9c65660b7cf9b65795" ON "user" ("external_id") `);
    await queryRunner.query(
      `CREATE TABLE "like_celeb" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, "celeb_id" uuid NOT NULL, CONSTRAINT "PK_abc11470db6c9b8e159ee79239a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a3ccd01f64aa3f0cd2f9e139c6" ON "like_celeb" ("user_id", "celeb_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, "content_id" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_86251b4d7d06a8412835950f35" ON "reaction" ("content_id") `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3613fc87c3d5403ba6ee240545" ON "reaction" ("user_id", "content_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "request_activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "from_status" character varying, "to_status" character varying NOT NULL, "old_request" jsonb, "new_request" jsonb NOT NULL, "request_id" uuid NOT NULL, "changed_by" uuid, "celeb_id" uuid NOT NULL, CONSTRAINT "PK_aa4908b6cb3eabe8de0c5b79a48" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "view" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "video_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_86cfb9e426c77d60b900fe2b543" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "receipt" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "receipt" text NOT NULL, "type" character varying NOT NULL, "request_id" uuid NOT NULL, "purchase_id" character varying, "status" character varying NOT NULL, CONSTRAINT "REL_e371d75ddbd3244994451336a1" UNIQUE ("request_id"), CONSTRAINT "PK_b4b9ec7d164235fbba023da9832" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5a7d8738e16778deab80a0aaa3" ON "receipt" ("purchase_id") `);
    await queryRunner.query(
      `CREATE TABLE "store_price_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "external_id" character varying NOT NULL, "product_id" character varying NOT NULL, "price" numeric NOT NULL DEFAULT 0, "display_price" numeric NOT NULL DEFAULT 0, CONSTRAINT "PK_291b2731407bdbc92c6ab847625" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_85e145fdd97d7010f2dcf2182f" ON "store_price_product" ("name") `);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_030fb999be1328781525651824" ON "store_price_product" ("external_id") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5489690616192121445b9c4e08" ON "store_price_product" ("product_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "home_celeb" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "celeb_id" uuid NOT NULL, "order" integer NOT NULL, CONSTRAINT "PK_cbe556c502e2649739ab05cd569" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "celeb_category" ("celebId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_eddaa90d5acbab04edff24d0a58" PRIMARY KEY ("celebId", "categoryId"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_05de041c574093ae4d19efdae6" ON "celeb_category" ("celebId") `);
    await queryRunner.query(`CREATE INDEX "IDX_928564d01045c1c84e06c886e7" ON "celeb_category" ("categoryId") `);
    await queryRunner.query(
      `CREATE TABLE "user_role" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_7b4e17a669299579dfa55a3fc35" PRIMARY KEY ("userId", "roleId"))`
    );
    await queryRunner.query(`CREATE INDEX "IDX_ab40a6f0cd7d3ebfcce082131f" ON "user_role" ("userId") `);
    await queryRunner.query(`CREATE INDEX "IDX_dba55ed826ef26b5b22bd39409" ON "user_role" ("roleId") `);
    await queryRunner.query(
      `ALTER TABLE "celeb" ADD CONSTRAINT "FK_2e827b2e3631dfeb1660a2b3850" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "celeb" ADD CONSTRAINT "FK_70f60c1f87ac2b92dcca56c54dc" FOREIGN KEY ("store_price_product_id") REFERENCES "store_price_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "explorer_celeb" ADD CONSTRAINT "FK_ec6e8f35043f4fc0fc1974718cc" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "explorer_celeb" ADD CONSTRAINT "FK_10f7d57edfb12d48283d0a0ea88" FOREIGN KEY ("group_id") REFERENCES "explorer_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "explorer_category" ADD CONSTRAINT "FK_3f4cc8b683fd33caa7c75baf525" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "explorer_category" ADD CONSTRAINT "FK_ff2395681fb0184ec93783ab3cb" FOREIGN KEY ("group_id") REFERENCES "explorer_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "celeb_media" ADD CONSTRAINT "FK_16102bdb7008f05a94fa66d86ae" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "celeb_social" ADD CONSTRAINT "FK_73063b884a95842e4e395d0f95d" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_e8cc3e481de06636e715c56ed18" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_a8971b2a7b93f9d56f7547a3489" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_d2221bb36ea3058611c2339a84b" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_0c06b8d2494611b35c67296356c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_a82218a4d8fbe1f6caacc936e56" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_3a3d93f532a056b0d89d09cdd21" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_926b07a7324c2f3637da8191430" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_d324593b8cfe439ae4860fd2ebc" FOREIGN KEY ("pronoun_id") REFERENCES "pronoun"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD CONSTRAINT "FK_e09f75d5fa3c30376e2c08c20a6" FOREIGN KEY ("occasion_id") REFERENCES "occasion"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_token" ADD CONSTRAINT "FK_e7ec45b0a6223be9884149b2abc" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "like_celeb" ADD CONSTRAINT "FK_8f2269eeb455fdd543b3cd6c103" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "like_celeb" ADD CONSTRAINT "FK_fdcf92a53a3856f90bd2b392831" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "reaction" ADD CONSTRAINT "FK_978c984f412d09b43304e41ae9a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "request_activity" ADD CONSTRAINT "FK_75808f0a467a0df7d50f86a8c55" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "request_activity" ADD CONSTRAINT "FK_7eb18398b2cb09bef4e7544a7cc" FOREIGN KEY ("changed_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "request_activity" ADD CONSTRAINT "FK_3425ed95a18216a2bd0bc4fb420" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "view" ADD CONSTRAINT "FK_f87162645f47c1af294d77820e5" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "view" ADD CONSTRAINT "FK_8defef1e2b3d61de4d5a8d7a1a2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_e371d75ddbd3244994451336a15" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "home_celeb" ADD CONSTRAINT "FK_2e920c5503ee37f04289efab237" FOREIGN KEY ("celeb_id") REFERENCES "celeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "celeb_category" ADD CONSTRAINT "FK_05de041c574093ae4d19efdae68" FOREIGN KEY ("celebId") REFERENCES "celeb"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "celeb_category" ADD CONSTRAINT "FK_928564d01045c1c84e06c886e74" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );

    // Initial roles
    await queryRunner.query(`INSERT INTO "role" (name) values ('SUPER_ADMIN')`);
    await queryRunner.query(`INSERT INTO "role" (name) values ('ADMIN')`);
    await queryRunner.query(`INSERT INTO "role" (name) values ('CELEB')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`);
    await queryRunner.query(`ALTER TABLE "celeb_category" DROP CONSTRAINT "FK_928564d01045c1c84e06c886e74"`);
    await queryRunner.query(`ALTER TABLE "celeb_category" DROP CONSTRAINT "FK_05de041c574093ae4d19efdae68"`);
    await queryRunner.query(`ALTER TABLE "home_celeb" DROP CONSTRAINT "FK_2e920c5503ee37f04289efab237"`);
    await queryRunner.query(`ALTER TABLE "receipt" DROP CONSTRAINT "FK_e371d75ddbd3244994451336a15"`);
    await queryRunner.query(`ALTER TABLE "view" DROP CONSTRAINT "FK_8defef1e2b3d61de4d5a8d7a1a2"`);
    await queryRunner.query(`ALTER TABLE "view" DROP CONSTRAINT "FK_f87162645f47c1af294d77820e5"`);
    await queryRunner.query(`ALTER TABLE "request_activity" DROP CONSTRAINT "FK_3425ed95a18216a2bd0bc4fb420"`);
    await queryRunner.query(`ALTER TABLE "request_activity" DROP CONSTRAINT "FK_7eb18398b2cb09bef4e7544a7cc"`);
    await queryRunner.query(`ALTER TABLE "request_activity" DROP CONSTRAINT "FK_75808f0a467a0df7d50f86a8c55"`);
    await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_978c984f412d09b43304e41ae9a"`);
    await queryRunner.query(`ALTER TABLE "like_celeb" DROP CONSTRAINT "FK_fdcf92a53a3856f90bd2b392831"`);
    await queryRunner.query(`ALTER TABLE "like_celeb" DROP CONSTRAINT "FK_8f2269eeb455fdd543b3cd6c103"`);
    await queryRunner.query(`ALTER TABLE "user_notification_token" DROP CONSTRAINT "FK_e7ec45b0a6223be9884149b2abc"`);
    await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_e09f75d5fa3c30376e2c08c20a6"`);
    await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_d324593b8cfe439ae4860fd2ebc"`);
    await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_926b07a7324c2f3637da8191430"`);
    await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_3a3d93f532a056b0d89d09cdd21"`);
    await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_a82218a4d8fbe1f6caacc936e56"`);
    await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_0c06b8d2494611b35c67296356c"`);
    await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_d2221bb36ea3058611c2339a84b"`);
    await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a8971b2a7b93f9d56f7547a3489"`);
    await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_e8cc3e481de06636e715c56ed18"`);
    await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"`);
    await queryRunner.query(`ALTER TABLE "celeb_social" DROP CONSTRAINT "FK_73063b884a95842e4e395d0f95d"`);
    await queryRunner.query(`ALTER TABLE "celeb_media" DROP CONSTRAINT "FK_16102bdb7008f05a94fa66d86ae"`);
    await queryRunner.query(`ALTER TABLE "explorer_category" DROP CONSTRAINT "FK_ff2395681fb0184ec93783ab3cb"`);
    await queryRunner.query(`ALTER TABLE "explorer_category" DROP CONSTRAINT "FK_3f4cc8b683fd33caa7c75baf525"`);
    await queryRunner.query(`ALTER TABLE "explorer_celeb" DROP CONSTRAINT "FK_10f7d57edfb12d48283d0a0ea88"`);
    await queryRunner.query(`ALTER TABLE "explorer_celeb" DROP CONSTRAINT "FK_ec6e8f35043f4fc0fc1974718cc"`);
    await queryRunner.query(`ALTER TABLE "celeb" DROP CONSTRAINT "FK_70f60c1f87ac2b92dcca56c54dc"`);
    await queryRunner.query(`ALTER TABLE "celeb" DROP CONSTRAINT "FK_2e827b2e3631dfeb1660a2b3850"`);
    await queryRunner.query(`DROP INDEX "IDX_dba55ed826ef26b5b22bd39409"`);
    await queryRunner.query(`DROP INDEX "IDX_ab40a6f0cd7d3ebfcce082131f"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP INDEX "IDX_928564d01045c1c84e06c886e7"`);
    await queryRunner.query(`DROP INDEX "IDX_05de041c574093ae4d19efdae6"`);
    await queryRunner.query(`DROP TABLE "celeb_category"`);
    await queryRunner.query(`DROP TABLE "home_celeb"`);
    await queryRunner.query(`DROP INDEX "IDX_5489690616192121445b9c4e08"`);
    await queryRunner.query(`DROP INDEX "IDX_030fb999be1328781525651824"`);
    await queryRunner.query(`DROP INDEX "IDX_85e145fdd97d7010f2dcf2182f"`);
    await queryRunner.query(`DROP TABLE "store_price_product"`);
    await queryRunner.query(`DROP INDEX "IDX_5a7d8738e16778deab80a0aaa3"`);
    await queryRunner.query(`DROP TABLE "receipt"`);
    await queryRunner.query(`DROP TABLE "view"`);
    await queryRunner.query(`DROP TABLE "request_activity"`);
    await queryRunner.query(`DROP INDEX "IDX_3613fc87c3d5403ba6ee240545"`);
    await queryRunner.query(`DROP INDEX "IDX_86251b4d7d06a8412835950f35"`);
    await queryRunner.query(`DROP TABLE "reaction"`);
    await queryRunner.query(`DROP INDEX "IDX_a3ccd01f64aa3f0cd2f9e139c6"`);
    await queryRunner.query(`DROP TABLE "like_celeb"`);
    await queryRunner.query(`DROP INDEX "IDX_d9479cbc9c65660b7cf9b65795"`);
    await queryRunner.query(`DROP INDEX "IDX_d34106f8ec1ebaf66f4f8609dd"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP INDEX "IDX_6a2d032c6a760a1cd761ce2d01"`);
    await queryRunner.query(`DROP TABLE "user_notification_token"`);
    await queryRunner.query(`DROP INDEX "IDX_ae4578dcaed5adff96595e6166"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP INDEX "IDX_d948be59537acc62e02bc8c060"`);
    await queryRunner.query(`DROP TABLE "request"`);
    await queryRunner.query(`DROP INDEX "IDX_a496abb52b66d2c748be30f4cf"`);
    await queryRunner.query(`DROP TABLE "video"`);
    await queryRunner.query(`DROP INDEX "IDX_3745180369294c5931c38e1cc0"`);
    await queryRunner.query(`DROP TABLE "rating"`);
    await queryRunner.query(`DROP INDEX "IDX_e42b496f1c6318f6dba377ab02"`);
    await queryRunner.query(`DROP INDEX "IDX_1d9524c3f502b54ac4964e0d91"`);
    await queryRunner.query(`DROP TABLE "pronoun"`);
    await queryRunner.query(`DROP INDEX "IDX_738a2491424fff7db7e4b372c9"`);
    await queryRunner.query(`DROP INDEX "IDX_7947cc046b284a6a15070090c4"`);
    await queryRunner.query(`DROP TABLE "occasion"`);
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "celeb_social"`);
    await queryRunner.query(`DROP TABLE "celeb_media"`);
    await queryRunner.query(`DROP INDEX "IDX_38a5075b576a5f075e9ad90d4a"`);
    await queryRunner.query(`DROP INDEX "IDX_23c05c292c439d77b0de816b50"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "explorer_category"`);
    await queryRunner.query(`DROP TABLE "explorer_group"`);
    await queryRunner.query(`DROP TABLE "explorer_celeb"`);
    await queryRunner.query(`DROP INDEX "IDX_c659007338910e418e8b4512ac"`);
    await queryRunner.query(`DROP INDEX "IDX_8badfed1a542696a696cdf39b8"`);
    await queryRunner.query(`DROP TABLE "celeb"`);
  }
}
