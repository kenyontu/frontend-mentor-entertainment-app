import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { getShows } from '~/actions/shows'
import { SearchInput } from '~/components/SearchInput'
import { ShowListPageMain } from '~/components/layout/ShowListPageMain'
import { ShowGrid } from '~/components/shows/ShowGrid'
import { ShowItem } from '~/components/shows/item/ShowItem'
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

  const shows = await getShows({ searchTerm, category: 'movie' })

  return (
    <ShowListPageMain>
      <SearchInput
        searchParamName={searchInputParam}
        inputProps={{
          placeholder: t('searchMoviesPlaceholder'),
        }}
      />

      <ShowGrid
        title={
          searchTerm
            ? t('searchResults', { count: shows.length ?? 0, searchTerm })
            : t('titleMovies')
        }
        shows={shows || []}
        renderItem={(show) => <ShowItem key={show.id} show={show} />}
      />
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
