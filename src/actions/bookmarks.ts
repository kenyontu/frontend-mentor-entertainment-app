'use server'

import { db } from '~/lib/db'
import { createServerAct } from './utils'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export const bookmarkShow = createServerAct(async () => {
  return z.object({
    userId: z.string(),
    showId: z.string(),
    pathToRevalidate: z.string(),
  })
})(async ({ data, error }) => {
  if (error) {
    return error
  }

  // TODO: validate user session

  try {
    const { userId, showId, pathToRevalidate } = data
    await db
      .insertInto('bookmarks')
      .values({ user_id: parseInt(userId), show_id: showId })
      .execute()

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
    userId: z.string(),
    showId: z.string(),
    pathToRevalidate: z.string(),
  })
})(async ({ data, error }) => {
  if (error) {
    return error
  }

  // TODO: validate user session

  try {
    const { userId, showId, pathToRevalidate } = data
    await db
      .deleteFrom('bookmarks')
      .where('user_id', '=', parseInt(userId))
      .where('show_id', '=', showId)
      .execute()

    revalidatePath(pathToRevalidate)
    return { status: 'success' }
  } catch (error) {
    return {
      status: 'error',
    }
  }
})
