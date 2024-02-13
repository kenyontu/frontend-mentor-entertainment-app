'use server'

import { bookmarksTable, db } from '~/lib/db'
import { createServerAct } from './utils'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { getTranslations } from 'next-intl/server'
import { and, eq } from 'drizzle-orm'

export const bookmarkShow = createServerAct(async () => {
  return z.object({
    showId: z.string(),
    pathToRevalidate: z.string(),
  })
})(async ({ data, error, session }) => {
  if (error) {
    return error
  }

  if (!session) {
    const t = await getTranslations('Error')
    return { status: 'error', message: t('signInToAccess') }
  }

  try {
    const userId = session.user.id

    const { showId, pathToRevalidate } = data
    await db.insert(bookmarksTable).values({ userId: parseInt(userId), showId })

    revalidatePath(pathToRevalidate)
    return { status: 'success' }
  } catch (error) {
    return {
      status: 'error',
    }
  }
})

export const unbookmarkShow = createServerAct(async () => {
  return z.object({
    showId: z.string(),
    pathToRevalidate: z.string(),
  })
})(async ({ data, error, session }) => {
  if (error) {
    return error
  }

  if (!session) {
    return { status: 'error', message: 'Unauthorized' }
  }

  try {
    const userId = session.user.id

    const { showId, pathToRevalidate } = data
    await db
      .delete(bookmarksTable)
      .where(
        and(
          eq(bookmarksTable.userId, parseInt(userId)),
          eq(bookmarksTable.showId, showId)
        )
      )

    revalidatePath(pathToRevalidate)
    return { status: 'success' }
  } catch (error) {
    return {
      status: 'error',
    }
  }
})
