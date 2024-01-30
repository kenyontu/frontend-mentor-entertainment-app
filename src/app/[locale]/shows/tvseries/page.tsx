import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import { SearchInput } from '~/components/SearchInput'
import { ShowListPageMain } from '~/components/layout/ShowListPageMain'
import { LoadingShowGrid, ShowGrid } from '~/components/shows/ShowGrid'
import { fetchShows } from '~/lib/db/data'
import { getSingleQueryValue } from '~/lib/utils'
import { LocaleParam } from '~/navigation'

type SearchParam = 's'

type Props = {
  searchParams: Record<SearchParam, string | string[] | undefined>
  params: LocaleParam
}

export default async function TVSeriesPage({
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
          placeholder: t('searchTvSeriesPlaceholder'),
        }}
      />

      <Suspense fallback={<LoadingShowGrid title={t('titleTvSeries')} />}>
        <TvSeries searchTerm={searchTerm} title={t('titleTvSeries')} />
      </Suspense>
    </ShowListPageMain>
  )
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('tvSeriesTitle'),
    description: t('homeDescription'),
  }
}

type TvSeriesProps = {
  title: string
  searchTerm?: string
}

async function TvSeries({ title, searchTerm }: TvSeriesProps) {
  const res = await fetchShows({
    category: 'tv-series',
    searchTerm,
  })

  const shows = res.status === 'success' ? res.data : null

  return <ShowGrid title={title} searchTerm={searchTerm} shows={shows} />
}
