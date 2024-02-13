import { SQL, and, eq, like, sql } from 'drizzle-orm'
import {
  Category,
  Show,
  User,
  bookmarksTable,
  db,
  showsTable,
  trendingShowsTable,
  usersTable,
} from '.'
import { SQLiteSelect } from 'drizzle-orm/sqlite-core'

type FetchRes<T> =
  | {
      status: 'success'
      data: T
    }
  | { status: 'error' }

type FetchShowsOptions = {
  searchTerm?: string
  category?: Category['id']
}

export async function fetchShows({
  searchTerm,
  category,
}: FetchShowsOptions): Promise<FetchRes<Show[]>> {
  try {
    let query = db.select().from(showsTable).$dynamic()

    const withConditions = <T extends SQLiteSelect>(
      qb: T,
      searchTerm: FetchShowsOptions['searchTerm'],
      category: FetchShowsOptions['category']
    ) => {
      const conditions: SQL[] = []

      if (searchTerm) {
        conditions.push(
          like(showsTable.title, `%${searchTerm}%`).append(sql` collate nocase`)
        )
      }

      if (category) {
        conditions.push(eq(showsTable.categoryId, category))
      }

      if (conditions.length == 2) {
        return qb.where(and(...conditions))
      }

      if (conditions.length == 1) {
        return qb.where(conditions[0])
      }

      return qb
    }

    query = withConditions(query, searchTerm, category)

    const shows = await query

    return { status: 'success', data: shows }
  } catch (error) {
    // TODO: Report error
    return { status: 'error' }
  }
}

export async function fetchTrendingShows(): Promise<FetchRes<Show[]>> {
  try {
    const shows = await db
      .select({
        id: showsTable.id,
        categoryId: showsTable.categoryId,
        ratingId: showsTable.ratingId,
        title: showsTable.title,
        year: showsTable.year,
      })
      .from(showsTable)
      .innerJoin(
        trendingShowsTable,
        eq(showsTable.id, trendingShowsTable.showId)
      )

    return { status: 'success', data: shows }
  } catch (error) {
    // TODO: Report error
    return { status: 'error' }
  }
}

type FetchBookmarkedShowsOptions = {
  userId: User['id']
  searchTerm?: string
}

export async function fetchBookmarkedShows({
  userId,
  searchTerm,
}: FetchBookmarkedShowsOptions): Promise<FetchRes<Show[]>> {
  try {
    let query = db
      .select({
        id: showsTable.id,
        categoryId: showsTable.categoryId,
        ratingId: showsTable.ratingId,
        title: showsTable.title,
        year: showsTable.year,
      })
      .from(showsTable)
      .innerJoin(bookmarksTable, eq(showsTable.id, bookmarksTable.showId))
      .where(eq(bookmarksTable.userId, userId))
      .$dynamic()

    function withSearchTerm<T extends SQLiteSelect>(
      qb: T,
      searchTerm: FetchBookmarkedShowsOptions['searchTerm']
    ) {
      if (searchTerm) {
        return qb.where(
          like(showsTable.title, `%${searchTerm}%`).append(sql` collate nocase`)
        )
      }

      return qb
    }

    query = withSearchTerm(query, searchTerm)

    const shows = await query

    return { status: 'success', data: shows }
  } catch (error) {
    // TODO: Report error
    return { status: 'error' }
  }
}

export async function fetchUserByEmail(
  email: User['email']
): Promise<FetchRes<User | null>> {
  try {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))

    const user = users.length > 0 ? users[0] : null

    return { status: 'success', data: user }
  } catch (error) {
    // TODO: Report error
    return { status: 'error' }
  }
}

export async function fetchBookmarkIds(
  userId: User['id']
): Promise<FetchRes<Show['id'][]>> {
  try {
    const bookmarks = await db
      .select({ showId: bookmarksTable.showId })
      .from(bookmarksTable)
      .where(eq(bookmarksTable.userId, userId))

    return { status: 'success', data: bookmarks.map((b) => b.showId) }
  } catch (error) {
    // TODO: Report error
    return { status: 'error' }
  }
}
