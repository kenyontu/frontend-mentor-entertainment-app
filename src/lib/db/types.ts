import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import {
  bookmarksTable,
  categoriesTable,
  ratingsTable,
  showsTable,
  usersTable,
} from '~/schema'

type RatingId = 'pg' | 'e' | '18+'

type CategoryId = 'movie' | 'tv-series'

export type Rating = Omit<InferSelectModel<typeof ratingsTable>, 'id'> & {
  id: RatingId
}
export type Category = Omit<InferSelectModel<typeof categoriesTable>, 'id'> & {
  id: CategoryId
}
export type Show = InferSelectModel<typeof showsTable>
export type User = InferSelectModel<typeof usersTable>
export type NewUser = InferInsertModel<typeof usersTable>
export type Bookmark = InferSelectModel<typeof bookmarksTable>
export type NewBookmark = InferInsertModel<typeof bookmarksTable>
export * from '~/schema'
