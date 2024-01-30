'use server'

import { getServerSession } from 'next-auth'
import { getTranslations } from 'next-intl/server'
import { authOptions } from '~/app/api/auth/[...nextauth]/route'
import { db, Bookmark, Show } from '~/lib/db'

export const getBookmarks = async () => {
  const tError = await getTranslations('Error')
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        status: 'error',
        error: tError('signInToAccess'),
      }
    }

    const userId = parseInt(session.user.id)

    // TODO: Figure out how to use Kysely to return a single value containing an array of bookmarked show_ids so we don't have to do the map bellow
    const res = await db
      .selectFrom('bookmarks')
      .where('user_id', '=', userId)
      .select('show_id')
      .execute()

    return { ok: true, showIds: res.map((row) => row.show_id) }
  } catch (error) {
    // TODO: Report error
    return { ok: false, error: tError('unexpectedError') }
  }
}

export const bookmarkShow = async (
  userId: Bookmark['user_id'],
  showId: Bookmark['show_id']
) => {
  const tError = await getTranslations('Error')

  try {
    await db
      .insertInto('bookmarks')
      .values({ user_id: userId, show_id: showId })
      .execute()

    return { ok: true }
  } catch (error) {
    // TODO: Report error
    return { ok: false, error: tError('unexpectedError') }
  }
}

export async function unbookmarkShow(
  userId: Bookmark['user_id'],
  showId: Bookmark['show_id']
) {
  const tError = await getTranslations('Error')
  try {
    await db
      .deleteFrom('bookmarks')
      .where('user_id', '=', userId)
      .where('show_id', '=', showId)
      .execute()

    return { ok: true }
  } catch (error) {
    // TODO: Report error
    return { ok: false, error: tError('unexpectedError') }
  }
}
