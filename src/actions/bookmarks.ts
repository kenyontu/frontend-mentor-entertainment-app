'use server'

import { sql } from '~/lib/db'
import { User } from './users'
import { Show } from './shows'

type Bookmark = Show['id']

export async function getBookmarks(userId: User['id']): Promise<Bookmark[]> {
  const result =
    await sql`SELECT show_id FROM bookmarks WHERE user_id=${userId}`

  return result.map((row) => row.show_id)
}

export async function bookmarkShow(
  userId: User['id'],
  showId: Show['id']
): Promise<void> {
  await sql`INSERT INTO bookmarks (user_id, show_id) VALUES (${userId}, ${showId});`
}

export async function unbookmarkShow(
  userId: User['id'],
  showId: Show['id']
): Promise<void> {
  await sql`DELETE FROM bookmarks WHERE user_id=${userId} AND show_id=${showId}`
}
