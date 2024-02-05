import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('ratings')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .execute()

  await db.schema
    .createTable('categories')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .execute()

  await db.schema
    .createTable('shows')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('category_id', 'text', (col) =>
      col.notNull().references('categories.id').onDelete('cascade')
    )
    .addColumn('rating_id', 'text', (col) =>
      col.notNull().references('ratings.id').onDelete('cascade')
    )
    .addColumn('year', 'integer', (col) => col.notNull())
    .addColumn('title', 'text', (col) => col.notNull())
    .execute()

  await db.schema
    .createTable('trending_shows')
    .addColumn('show_id', 'text', (col) =>
      col.primaryKey().references('shows.id').onDelete('cascade')
    )
    .execute()

  await db.schema
    .createTable('users')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('email', 'text', (col) => col.unique().notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('password', 'text', (col) => col.notNull())
    .execute()

  await db.schema
    .createTable('bookmarks')
    .addColumn('user_id', 'integer', (col) =>
      col.notNull().references('users.id').onDelete('cascade')
    )
    .addColumn('show_id', 'text', (col) =>
      col.notNull().references('shows.id').onDelete('cascade')
    )
    .addPrimaryKeyConstraint('bookmarks_primary_key', ['user_id', 'show_id'])
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('ratings').execute()
  await db.schema.dropTable('categories').execute()
  await db.schema.dropTable('trending_shows').execute()
  await db.schema.dropTable('users').execute()
  await db.schema.dropTable('bookmarks').execute()
}
