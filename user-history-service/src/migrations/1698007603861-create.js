export class Create1698007603861 {
    name = 'Create1698007603861';

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event" character varying NOT NULL, "field" character varying(32), "old_value" character varying, "new_value" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_777252b9045d8011ab83c5b0834" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_history" ADD CONSTRAINT "FK_d80f22cc1761daf43ca5d41937c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_history" DROP CONSTRAINT "FK_d80f22cc1761daf43ca5d41937c"`);
        await queryRunner.query(`DROP TABLE "user_history"`);
    }
}
