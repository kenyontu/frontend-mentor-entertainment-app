import { unstable_setRequestLocale, getTranslations } from 'next-intl/server'
import { getShows, getTrendingShows } from '~/actions/shows'
import { SearchInput } from '~/components/SearchInput'
import { ShowListPageMain } from '~/components/layout/ShowListPageMain'
import { ShowGrid } from '~/components/shows/ShowGrid'
import { TrendingShows } from '~/components/shows/TrendingShows'
import { ShowItem } from '~/components/shows/item/ShowItem'
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

  const trendingShows = await getTrendingShows()
  const shows = await getShows({ searchTerm })

  return (
    <ShowListPageMain>
      <SearchInput
        searchParamName={searchInputParam}
        inputProps={{
          placeholder: t('searchPlaceholder'),
        }}
      />

      {!searchTerm && <TrendingShows shows={trendingShows} />}

      <ShowGrid
        title={
          searchTerm
            ? t('searchResults', { count: shows.length ?? 0, searchTerm })
            : t('title')
        }
        shows={shows || []}
        renderItem={(show) => <ShowItem key={show.id} show={show} />}
      />
    </ShowListPageMain>
  )
}
