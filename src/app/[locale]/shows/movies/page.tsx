import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import { SearchInput } from '~/ui/SearchInput'
import { ShowListPageMain } from '~/ui/layout/ShowListPageMain'
import { LoadingShowGrid, ShowGrid } from '~/ui/shows/ShowGrid'
import { fetchShows } from '~/lib/db/data'
import { getSingleQueryValue } from '~/lib/utils'
import { LocaleParam } from '~/navigation'

type SearchParam = 's'

type Props = {
  searchParams: Record<SearchParam, string | string[] | undefined>
  params: LocaleParam
}

export default async function MoviesPage({
  searchParams,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations('Shows')

  const searchInputParam: SearchParam = 's'
  const searchTerm = getSingleQueryValue(searchParams[searchInputParam])

  return (
    <ShowListPageMain>
      <SearchInput
        searchParamName={searchInputParam}
        inputProps={{
          placeholder: t('searchMoviesPlaceholder'),
        }}
      />

      <Suspense fallback={<LoadingShowGrid title={t('titleMovies')} />}>
        <Movies searchTerm={searchTerm} title={t('titleMovies')} />
      </Suspense>
    </ShowListPageMain>
  )
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('moviesTitle'),
    description: t('homeDescription'),
  }
}

type MoviesProps = {
  title: string
  searchTerm?: string
}

async function Movies({ title, searchTerm }: MoviesProps) {
  const res = await fetchShows({
    category: 'movie',
    searchTerm,
  })

  const shows = res.status === 'success' ? res.data : null

  return <ShowGrid title={title} searchTerm={searchTerm} shows={shows} />
}
