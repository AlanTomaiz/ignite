import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateColumnUpdatedAtUsersTable1649103471376
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'updated_at');
  }
}
