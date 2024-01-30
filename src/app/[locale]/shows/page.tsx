import { Metadata } from 'next'
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { SearchInput } from '~/components/SearchInput'
import { ShowListPageMain } from '~/components/layout/ShowListPageMain'
import { LoadingShowGrid, ShowGrid } from '~/components/shows/ShowGrid'
import { ShowSectionHeader } from '~/components/shows/ShowSectionHeader'
import {
  LoadingTrendingShows,
  TrendingShows,
} from '~/components/shows/TrendingShows'
import { fetchShows } from '~/lib/db/data'
import { getSingleQueryValue } from '~/lib/utils'
import { LocaleParam } from '~/navigation'

type SearchParam = 's'

type Props = {
  searchParams: Record<SearchParam, string | string[] | undefined>
  params: LocaleParam
}

export default async function ShowsPage({
  searchParams,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations('Shows')

  const searchInputParam: SearchParam = 's'
  const searchTerm = getSingleQueryValue(searchParams[searchInputParam])

  const showTrending = !searchTerm

  return (
    <ShowListPageMain>
      <SearchInput
        searchParamName={searchInputParam}
        inputProps={{
          placeholder: t('searchPlaceholder'),
        }}
      />

      {showTrending && (
        <>
          <ShowSectionHeader>{t('trending')}</ShowSectionHeader>
          <Suspense fallback={<LoadingTrendingShows />}>
            <TrendingShows />
          </Suspense>
        </>
      )}

      <Suspense fallback={<LoadingShowGrid title={t('titleMovies')} />}>
        <Shows searchTerm={searchTerm} title={t('title')} />
      </Suspense>
    </ShowListPageMain>
  )
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  }
}

type ShowsProps = {
  title: string
  searchTerm?: string
}

async function Shows({ title, searchTerm }: ShowsProps) {
  const res = await fetchShows({
    searchTerm,
  })

  const shows = res.status === 'success' ? res.data : null

  return <ShowGrid title={title} searchTerm={searchTerm} shows={shows} />
}
