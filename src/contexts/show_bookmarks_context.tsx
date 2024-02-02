'use client'

import { useSession } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { createContext, useContext } from 'react'
import useSWR from 'swr'
import { bookmarkShow, unbookmarkShow } from '~/actions/bookmarks'
import { Show } from '~/lib/db'

type ContextState = {
  isShowBookmarked: (showId: Show['id']) => boolean
  toggleBookmark: (showId: Show['id']) => Promise<void>
}

const ShowBookmarksContext = createContext<ContextState | null>(null)

function fetchBookmarkIds(url: string) {}

type Props = {
  children: React.ReactNode
}

export function ShowBookmarksProvider({ children }: Props) {
  const locale = useLocale()
  const session = useSession()
  const userId = session.data?.user.id

  const { data, error, mutate } = useSWR<Set<string>, any, string>(
    '/api/shows/bookmarks',
    (url) => {
      return fetch(url)
        .then((res) => res.json())
        .then((json) => new Set(json.show_ids))
    }
  )

  const isShowBookmarked = (showId: Show['id']) => {
    return data?.has(showId) || false
  }

  const toggleBookmark = async (showId: Show['id']): Promise<void> => {
    if (!userId) return
    const bookmarked = isShowBookmarked(showId)

    if (bookmarked) {
      const getUpdatedData = (data?: Set<string>) => {
        const updated = new Set(data)
        updated.delete(showId)
        return updated
      }
      mutate(
        async (bookmarks) => {
          const formData = new FormData()
          formData.append('userId', userId)
          formData.append('showId', showId)
          formData.append('pathToRevalidate', `/${locale}/shows/bookmarks`)

          await unbookmarkShow(formData)
          return getUpdatedData(bookmarks)
        },
        {
          optimisticData: getUpdatedData,
          revalidate: true,
          rollbackOnError: true,
        }
      )
    } else {
      const getUpdatedData = (data?: Set<string>) => {
        const updated = new Set(data)
        updated.add(showId)
        return updated
      }
      mutate(
        async (bookmarks) => {
          const formData = new FormData()
          formData.append('userId', userId)
          formData.append('showId', showId)
          formData.append('pathToRevalidate', `/${locale}/shows/bookmarks`)

          await bookmarkShow(formData)
          return getUpdatedData(bookmarks)
        },
        {
          optimisticData: getUpdatedData,
          revalidate: true,
          rollbackOnError: true,
        }
      )
    }
  }

  const state = {
    isShowBookmarked,
    toggleBookmark,
  }

  return (
    <ShowBookmarksContext.Provider value={state}>
      {children}
    </ShowBookmarksContext.Provider>
  )
}

export function useShowBookmark(showId: Show['id']) {
  const context = useContext(ShowBookmarksContext)
  if (!context) {
    throw new Error(
      'useShowBookmark should be used within ShowBookmarksProvider'
    )
  }

  return {
    bookmarked: context.isShowBookmarked(showId),
    toggleBookmark: () => context.toggleBookmark(showId),
  }
}
