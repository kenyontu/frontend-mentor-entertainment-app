import { Show } from '@prisma/client'

export type PostBookmarkError = { message: string }

export async function postBookmark(
  showId: Show['id'],
) {
  try {
    const res = await fetch('/api/bookmarks', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ showId }),
    })

    if (!res.ok) {
      const resBody = await res.json()
      return Promise.reject(new Error((resBody as PostBookmarkError).message))
    }
  } catch (error) {
    // TODO: Report error
    throw new Error(`Error while adding bookmark`)
  }
}

export type GetBookmarksResponse = { bookmarks: Show['id'][] }

export type GetBookmarksErrorResponse = { message: string }

export async function getBookmarks(url: string) {
  try {
    const res = await fetch(url)
    const resBody = await res.json()

    if (!res.ok) {
      return Promise.reject(
        new Error((resBody as GetBookmarksErrorResponse).message),
      )
    }

    const bookmarksSet = new Set((resBody as GetBookmarksResponse).bookmarks)

    return bookmarksSet
  } catch (error) {
    // TODO: Report error
    throw new Error('Error while retrieving bookmarks')
  }
}

export type DeleteBookmarkErrorResponse = { message: string }

export async function deleteBookmark(showId: Show['id']) {
  try {
    const res = await fetch(`/api/bookmarks/${showId}`, { method: 'delete' })
    if (!res.ok) {
      const resBody: DeleteBookmarkErrorResponse = await res.json()
      return Promise.reject(new Error(resBody.message))
    }
  } catch (error) {
    // TODO: Report error
    throw new Error('Error while retrieving bookmarks')
  }
}
