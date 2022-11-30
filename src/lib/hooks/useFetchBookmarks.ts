import { Show } from '@prisma/client'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import * as bookmarksApi from '../api/bookmarks'

export function useFetchBookmarks() {
  const { status } = useSession()
  const isUserAuthenticated = status === 'authenticated'

  const url = `/api/bookmarks`

  // Passing null as key to useSWR will prevent it from fetching data
  const { data, error, mutate, isValidating } = useSWR<
    Awaited<ReturnType<typeof bookmarksApi.getBookmarks>>
  >(
    isUserAuthenticated ? url : null,
    (url) => bookmarksApi.getBookmarks(url),
  )

  function addBookmark(showId: Show['id']) {
    if (isValidating || !isUserAuthenticated) {
      return
    }
    mutate(async bookmarks => {
      await bookmarksApi.postBookmark(showId)

      return new Set(bookmarks).add(showId)
    }, {
      optimisticData: new Set(data).add(showId),
      revalidate: false,
      rollbackOnError: true,
    })
  }

  function deleteBookmark(showId: Show['id']) {
    if (isValidating || !isUserAuthenticated) {
      return
    }
    mutate(async bookmarks => {
      await bookmarksApi.deleteBookmark(showId)
      const copy = new Set(bookmarks)
      copy.delete(showId)

      return copy
    }, {
      optimisticData: (bookmarks) => {
        const copy = new Set(bookmarks)
        copy.delete(showId)

        return copy
      },
      revalidate: false,
      rollbackOnError: true,
    })
  }

  function isShowBookmarked(showId: Show['id']) {
    return data?.has(showId) ?? false
  }

  return {
    data: data || new Set(),
    isLoading: !data || (data.size === 0 && isValidating),
    isShowBookmarked,
    error,
    addBookmark,
    deleteBookmark,
  }
}
