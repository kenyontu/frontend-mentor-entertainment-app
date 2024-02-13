import { text, integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core'

export const categoriesTable = sqliteTable('categories', {
  id: text('id').primaryKey(),
})

export const ratingsTable = sqliteTable('ratings', {
  id: text('id').primaryKey(),
})

export const showsTable = sqliteTable('shows', {
  id: text('id').primaryKey(),
  categoryId: text('category_id')
    .notNull()
    .references(() => categoriesTable.id, { onDelete: 'cascade' }),
  ratingId: text('rating_id')
    .notNull()
    .references(() => ratingsTable.id, { onDelete: 'cascade' }),
  year: integer('year').notNull(),
  title: text('title').notNull(),
})

export const trendingShowsTable = sqliteTable('trending_shows', {
  showId: text('show_id')
    .primaryKey()
    .references(() => showsTable.id, { onDelete: 'cascade' }),
})

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  password: text('password').notNull(),
})

export const bookmarksTable = sqliteTable(
  'bookmarks',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    showId: text('show_id')
      .notNull()
      .references(() => showsTable.id, { onDelete: 'cascade' }),
  },
  (bookmarks) => ({
    pk: primaryKey({ columns: [bookmarks.userId, bookmarks.showId] }),
  })
)
