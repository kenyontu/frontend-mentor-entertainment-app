import { Generated, Insertable, Selectable } from 'kysely'

export type Database = {
  ratings: RatingsTable
  categories: CategoriesTable
  shows: ShowsTable
  trending_shows: TrendingShowsTable
  users: UsersTable
  bookmarks: BookmarksTable
}

type RatingsTable = {
  id: 'pg' | 'e' | '18+'
}

type CategoriesTable = {
  id: 'movie' | 'tv-series'
}

type ShowsTable = {
  id: string
  category_id: CategoriesTable['id']
  rating_id: RatingsTable['id']
  year: number
  title: string
}

type TrendingShowsTable = {
  show_id: ShowsTable['id']
}

type UsersTable = {
  id: Generated<number>
  email: string
  name: string
  password: string
}

type BookmarksTable = {
  user_id: UsersTable['id']
  show_id: ShowsTable['id']
}

export type Rating = Selectable<RatingsTable>
export type Category = Selectable<CategoriesTable>
export type Show = Selectable<ShowsTable>
export type User = Selectable<UsersTable>
export type NewUser = Insertable<UsersTable>
export type Bookmark = Selectable<BookmarksTable>
export type NewBookmark = Insertable<BookmarksTable>
