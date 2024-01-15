'use server'

import { db, User, Bookmark } from '~/lib/db'

export async function getBookmarks(userId: User['id']) {
  // TODO: Figure out how to use Kysely to return a single value containing an array of bookmarked show_ids
  const res = await db
    .selectFrom('bookmarks')
    .where('user_id', '=', userId)
    .select('show_id')
    .execute()

  return res.map((row) => row.show_id)
}

export async function bookmarkShow(
  userId: Bookmark['user_id'],
  showId: Bookmark['show_id']
) {
  await db
    .insertInto('bookmarks')
    .values({ user_id: userId, show_id: showId })
    .execute()
}

export async function unbookmarkShow(
  userId: Bookmark['user_id'],
  showId: Bookmark['show_id']
) {
  await db
    .deleteFrom('bookmarks')
    .where('user_id', '=', userId)
    .where('show_id', '=', showId)
    .execute()
}
