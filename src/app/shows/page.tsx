import { getShows, getTrendingShows } from '~/actions/shows'
import { SearchInput } from '~/components/SearchInput'
import { ShowListPageMain } from '~/components/layout/ShowListPageMain'
import { ShowGrid } from '~/components/shows/ShowGrid'
import { TrendingShows } from '~/components/shows/TrendingShows'
import { ShowItem } from '~/components/shows/item/ShowItem'
import { getSearchResultText, getSingleQueryValue } from '~/lib/utils'

type SearchParam = 's'

export default async function ShowsPage({
  searchParams,
}: {
  searchParams: Record<SearchParam, string | string[] | undefined>
}) {
  const searchInputParam: SearchParam = 's'
  const searchValue = getSingleQueryValue(searchParams[searchInputParam])

  const trendingShows = await getTrendingShows()
  const shows = await getShows(searchValue)

  return (
    <ShowListPageMain>
      <SearchInput
        searchParamName={searchInputParam}
        inputProps={{
          placeholder: 'Search for movies or TV series',
        }}
      />

      {!searchValue && <TrendingShows shows={trendingShows} />}

      <ShowGrid
        title={
          searchValue
            ? getSearchResultText(shows.length ?? 0, searchValue)
            : 'Shows'
        }
        shows={shows || []}
        renderItem={(show) => <ShowItem key={show.id} show={show} />}
      />
    </ShowListPageMain>
  )
}
