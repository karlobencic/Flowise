import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDocumentStore1711637331047 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "document_store" (
                "id" varchar PRIMARY KEY NOT NULL, 
                "name" varchar NOT NULL, 
                "description" varchar NOT NULL, 
                "subFolder" varchar NOT NULL, 
                "type" varchar NOT NULL, 
                "status" varchar NOT NULL, 
                "files" text, 
                "metrics" text, 
                "config" text, 
                "updatedDate" datetime NOT NULL DEFAULT (datetime('now')),
                "createdDate" datetime NOT NULL DEFAULT (datetime('now')));`
        )
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "document_store_file_chunk" (
                "id" varchar PRIMARY KEY NOT NULL, 
                "docId" varchar NOT NULL, 
                "storeId" varchar NOT NULL, 
                "pageContent" text, 
                "metadata" text 
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "document_store";`)
        await queryRunner.query(`DROP TABLE IF EXISTS "document_store_file_chunk";`)
    }
}