import type { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { ShowListPageMain } from '~/components/layout/ShowListPageMain'
import { SearchInput } from '~/components/SearchInput'
import { ShowItem } from '~/components/shows/item/ShowItem'
import { TrendingShowItem } from '~/components/shows/item/TrendingShowItem'
import { ShowGrid } from '~/components/shows/ShowGrid'
import { TrendingShows } from '~/components/shows/TrendingShows'
import { Spinner } from '~/components/Spinner'
import { Typography } from '~/components/Typography'
import { useFetchBookmarks } from '~/lib/hooks/useFetchBookmarks'
import { useFetchShows } from '~/lib/hooks/useFetchShows'
import { useFetchTrendingShows } from '~/lib/hooks/useFetchTrendingShows'
import { getSearchResultText, getSingleQueryValue } from '~/lib/utils'
import {
  getShowsWithThumbnails,
  ShowWithThumbnail,
  TrendingShow,
} from '~/models/show'
import styles from '~/styles/shows.module.scss'

type PageProps = {
  shows: ShowWithThumbnail[]
  trendingShows: TrendingShow[]
}

const Home: NextPage<PageProps> = (
  props,
) => {
  const { status } = useSession()
  const isUserAuthenticated = status === 'authenticated'

  const router = useRouter()
  const searchTerm = getSingleQueryValue(router.query.s)

  const bookmarks = useFetchBookmarks()
  const trendingShows = useFetchTrendingShows(props.trendingShows)
  const shows = useFetchShows('/api/shows', searchTerm, props.shows)

  const error = shows.error || trendingShows.error

  // Using flags to indicate whether a component should be rendered or not
  let showError = false
  let showLoading = false
  let showTrendingShows = false
  let showShows = false

  if (error) {
    showError = true
  } else if (!searchTerm && trendingShows.data && shows.data) {
    showTrendingShows = true
    showShows = true
  } else if (searchTerm && shows.data) {
    showShows = true
  } else {
    showLoading = true
  }

  return (
    <>
      <Head>
        <title>Frontend Mentor | Entertainment web app</title>
        <meta name='description' content='Watch Movies and TV series' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
      </Head>

      <ShowListPageMain>
        <SearchInput
          inputProps={{
            placeholder: 'Search for movies or TV series',
          }}
        />

        {showError && (
          <Typography as='p' variant='h4' className={styles.message}>
            There was an error loading shows
          </Typography>
        )}

        {showTrendingShows && (
          <TrendingShows
            shows={trendingShows.data || []}
            renderItem={(show, index) => (
              <TrendingShowItem
                key={show.id}
                show={show}
                preloadImage={index === 0}
                showBookmarkButton={isUserAuthenticated}
                bookmarked={bookmarks.isShowBookmarked(show.id)}
                addBookmark={bookmarks.addBookmark}
                deleteBookmark={bookmarks.deleteBookmark}
              />
            )}
          />
        )}

        {showShows
          && (
            <ShowGrid
              title={searchTerm
                ? getSearchResultText(shows.data?.length ?? 0, searchTerm)
                : 'Shows'}
              shows={shows.data || []}
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

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allShows = await getShowsWithThumbnails()

  const trendingShows: TrendingShow[] = []
  const shows: ShowWithThumbnail[] = []

  allShows.forEach((show) => {
    if (show.isTrending) {
      trendingShows.push(show)
      return
    }

    shows.push(show)
  })

  return {
    props: { shows, trendingShows },
  }
}

export default Home
