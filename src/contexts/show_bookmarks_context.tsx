'use client'

import { useSession } from 'next-auth/react'
import { createContext, useContext } from 'react'
import useSWR from 'swr'
import { bookmarkShow, getBookmarks, unbookmarkShow } from '~/actions/bookmarks'
import { Show } from '~/lib/db'

type ContextState = {
  isShowBookmarked: (showId: Show['id']) => boolean
  toggleBookmark: (showId: Show['id']) => Promise<void>
}

const ShowBookmarksContext = createContext<ContextState | null>(null)

type Props = {
  children: React.ReactNode
}

export function ShowBookmarksProvider({ children }: Props) {
  const session = useSession()
  const userId = session.data?.user.id
  const swrKey = ['show_bookmarks', userId] as const

  const { data, mutate } = useSWR<Set<string>, any, typeof swrKey>(
    swrKey,
    async ([_, userId]) => {
      if (userId) {
        const showIds = await getBookmarks(parseInt(userId))
        return new Set(showIds)
      }

      return new Set()
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
          await unbookmarkShow(parseInt(userId), showId)
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
          await bookmarkShow(parseInt(userId), showId)
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
