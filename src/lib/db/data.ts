import { db } from '.'
import { Category, Show, User } from './types'

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
    let query = db.selectFrom('shows')

    if (searchTerm) {
      query = query.where(db.fn('lower', ['title']), 'like', `%${searchTerm}%`)
    }

    if (category) {
      query = query.where('category_id', '=', category)
    }

    const shows = await query
      .select(['id', 'category_id', 'rating_id', 'title', 'year'])
      .execute()

    return { status: 'success', data: shows }
  } catch (error) {
    // TODO: Report error
    return { status: 'error' }
  }
}

export async function fetchTrendingShows(): Promise<FetchRes<Show[]>> {
  try {
    const shows = await db
      .selectFrom('shows')
      .innerJoin('trending_shows', 'trending_shows.show_id', 'shows.id')
      .select([
        'shows.id',
        'shows.category_id',
        'shows.rating_id',
        'shows.title',
        'shows.year',
      ])
      .execute()

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
      .selectFrom('shows')
      .innerJoin('bookmarks', 'bookmarks.show_id', 'shows.id')
      .select([
        'shows.id',
        'shows.category_id',
        'shows.rating_id',
        'shows.title',
        'shows.year',
      ])
      .where('bookmarks.user_id', '=', userId)

    if (searchTerm) {
      query = query.where(db.fn('lower', ['title']), 'like', `%${searchTerm}%`)
    }

    const shows: Show[] = await query.execute()

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
    const user = await db
      .selectFrom('users')
      .select(['id', 'name', 'email', 'password'])
      .where('email', '=', email)
      .executeTakeFirst()

    return { status: 'success', data: user ?? null }
  } catch (error) {
    // TODO: Report error
    return { status: 'error' }
  }
}

export async function fetchBookmarkIds(
  userId: User['id']
): Promise<FetchRes<Show['id'][]>> {
  try {
    const res = await db
      .selectFrom('bookmarks')
      .where('user_id', '=', userId)
      .select('show_id')
      .execute()

    return { status: 'success', data: res.map((row) => row.show_id) }
  } catch (error) {
    // TODO: Report error
    return { status: 'error' }
  }
}
