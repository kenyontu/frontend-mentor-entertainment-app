import { Prisma } from '@prisma/client'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { ShowListPageMain } from '~/components/layout/ShowListPageMain'
import { SearchInput } from '~/components/SearchInput'
import { ShowItem } from '~/components/shows/item/ShowItem'
import { ShowGrid } from '~/components/shows/ShowGrid'
import { Spinner } from '~/components/Spinner'
import { Typography } from '~/components/Typography'
import { useFetchBookmarkedShows } from '~/lib/hooks/useFetchBookmarkedShows'
import { useFetchBookmarks } from '~/lib/hooks/useFetchBookmarks'
import { getSearchResultText, getSingleQueryValue } from '~/lib/utils'
import { getMovieShows } from '~/models/show'
import styles from '~/styles/shows.module.scss'

type MovieShow = Prisma.PromiseReturnType<typeof getMovieShows>[number]

type PageProps = { shows: MovieShow[] }

const BookmarksPage: NextPage<PageProps> = () => {
  useSession({ required: true })

  const router = useRouter()
  const searchTerm = getSingleQueryValue(router.query.s)

  const bookmarks = useFetchBookmarks()
  const bookmarkedShows = useFetchBookmarkedShows(searchTerm)

  const error = bookmarkedShows.error || bookmarks.error

  let showSearch = false
  let showError = false
  let showShows = false
  let showEmpty = false
  let showLoading = false

  if (error) {
    showError = true
  } else if (!bookmarkedShows.data) {
    showLoading = true
  } else if (bookmarks.data.size === 0) {
    showEmpty = true
  } else {
    showShows = true
    showSearch = true
  }

  if (searchTerm) {
    showSearch = true
  }

  return (
    <>
      <Head>
        <title>Bookmarks</title>
      </Head>

      <ShowListPageMain>
        {showSearch && (
          <SearchInput
            inputProps={{
              placeholder: 'Search bookmarks',
            }}
          />
        )}

        {showError && (
          <Typography as='p' variant='h4' className={styles.message}>
            There was an error loading your bookmarks
          </Typography>
        )}

        {showLoading && <Spinner className={styles.spinner} />}

        {showEmpty && (
          <Typography as='p' variant='h4' className={styles.message}>
            Movies or TV series that you bookmark will be listed here
          </Typography>
        )}

        {showShows && (() => {
          const filteredShows = bookmarkedShows.data?.filter(show =>
            bookmarks.isShowBookmarked(show.id)
          ) ?? []

          return (
            <ShowGrid
              title={searchTerm
                ? getSearchResultText(filteredShows.length, searchTerm)
                : 'Bookmarks'}
              shows={filteredShows}
              renderItem={(show) => (
                <ShowItem
                  key={show.id}
                  show={show}
                  showBookmarkButton
                  addBookmark={bookmarks.addBookmark}
                  deleteBookmark={bookmarks.deleteBookmark}
                  bookmarked
                />
              )}
            />
          )
        })()}
      </ShowListPageMain>
    </>
  )
}

export default BookmarksPage
