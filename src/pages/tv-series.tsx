import { Prisma } from '@prisma/client'
import type { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { ShowListPageMain } from '~/components/layout/ShowListPageMain'
import { SearchInput } from '~/components/SearchInput'
import { ShowItem } from '~/components/shows/item/ShowItem'
import { ShowGrid } from '~/components/shows/ShowGrid'
import { Spinner } from '~/components/Spinner'
import { Typography } from '~/components/Typography'
import { useFetchBookmarks } from '~/lib/hooks/useFetchBookmarks'
import { useFetchShows } from '~/lib/hooks/useFetchShows'
import { getSearchResultText, getSingleQueryValue } from '~/lib/utils'
import { getTVSeriesShows } from '~/models/show'
import styles from '~/styles/shows.module.scss'

type TvSeries = Prisma.PromiseReturnType<typeof getTVSeriesShows>[number]

type PageProps = { shows: TvSeries[] }

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const shows = await getTVSeriesShows()

  return {
    props: { shows },
  }
}

const TVSeriesPage: NextPage<PageProps> = (props) => {
  const { status } = useSession()
  const isUserAuthenticated = status === 'authenticated'

  const router = useRouter()
  const searchTerm = getSingleQueryValue(router.query.s)

  const bookmarks = useFetchBookmarks()
  const shows = useFetchShows(
    '/api/tvseries',
    searchTerm,
    props.shows,
  )

  let showError = false
  let showLoading = false
  let showShows = false

  if (shows.error) {
    showError = true
  } else if (shows.data) {
    showShows = true
  } else {
    showLoading = true
  }

  return (
    <>
      <Head>
        <title>TV Series</title>
      </Head>

      <ShowListPageMain>
        <SearchInput
          inputProps={{
            placeholder: 'Search for TV series',
          }}
        />

        {showError && (
          <Typography as='p' variant='h4' className={styles.message}>
            There was an error loading TV series
          </Typography>
        )}

        {showShows && (
          <ShowGrid
            title={searchTerm
              ? getSearchResultText(shows.data?.length ?? 0, searchTerm)
              : 'TV Series'}
            shows={shows.data ?? []}
            renderItem={(show) => (
              <ShowItem
                key={show.id}
                show={show}
                showBookmarkButton={isUserAuthenticated}
                bookmarked={bookmarks.isShowBookmarked(show.id)}
                addBookmark={bookmarks.addBookmark}
                deleteBookmark={bookmarks.deleteBookmark}
              />
            )}
          />
        )}

        {showLoading && <Spinner className={styles.spinner} />}
      </ShowListPageMain>
    </>
  )
}

export default TVSeriesPage
