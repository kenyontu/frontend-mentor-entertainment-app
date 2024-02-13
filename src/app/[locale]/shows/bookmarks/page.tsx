import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import { authOptions } from '~/app/api/auth/[...nextauth]/options'
import { SearchInput } from '~/components/SearchInput'
import { ShowListPageMain } from '~/components/layout/ShowListPageMain'
import { LoadingShowGrid, ShowGrid } from '~/components/shows/ShowGrid'
import { User } from '~/lib/db'
import { fetchBookmarkedShows } from '~/lib/db/data'
import { getSingleQueryValue } from '~/lib/utils'
import { LocaleParam, redirect } from '~/navigation'

type SearchParam = 's'

type Props = {
  searchParams: Record<SearchParam, string | string[] | undefined>
  params: LocaleParam
}

export default async function BookmarksPage({
  searchParams,
  params: { locale },
}: Props) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect('/auth/signin')
    return
  }

  unstable_setRequestLocale(locale)
  const t = await getTranslations('Shows')

  const userId = parseInt(session.user.id)
  const searchInputParam: SearchParam = 's'
  const searchTerm = getSingleQueryValue(searchParams[searchInputParam])

  return (
    <ShowListPageMain>
      <SearchInput
        searchParamName={searchInputParam}
        inputProps={{
          placeholder: t('searchBookmarksPlaceholder'),
        }}
      />

      <Suspense fallback={<LoadingShowGrid title={t('titleBookmarks')} />}>
        <BookmarkedShows
          userId={userId}
          searchTerm={searchTerm}
          title={t('titleBookmarks')}
          emptyMsg={t('noBookmarks')}
        />
      </Suspense>
    </ShowListPageMain>
  )
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('bookmarksTitle'),
    description: t('homeDescription'),
  }
}

type BookmarkedShowsProps = {
  title: string
  searchTerm?: string
  userId: User['id']
  emptyMsg: string
}

async function BookmarkedShows({
  title,
  searchTerm,
  emptyMsg,
  userId,
}: BookmarkedShowsProps) {
  const res = await fetchBookmarkedShows({
    userId,
    searchTerm,
  })

  const shows = res.status === 'success' ? res.data : null

  return (
    <ShowGrid
      title={title}
      searchTerm={searchTerm}
      shows={shows}
      emptyMsg={emptyMsg}
    />
  )
}
