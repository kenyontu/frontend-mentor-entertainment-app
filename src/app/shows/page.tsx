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
  const searchTerm = getSingleQueryValue(searchParams[searchInputParam])

  const trendingShows = await getTrendingShows()
  const shows = await getShows({ searchTerm })

  return (
    <ShowListPageMain>
      <SearchInput
        searchParamName={searchInputParam}
        inputProps={{
          placeholder: 'Search for movies or TV series',
        }}
      />

      {!searchTerm && <TrendingShows shows={trendingShows} />}

      <ShowGrid
        title={
          searchTerm
            ? getSearchResultText(shows.length ?? 0, searchTerm)
            : 'Shows'
        }
        shows={shows || []}
        renderItem={(show) => <ShowItem key={show.id} show={show} />}
      />
    </ShowListPageMain>
  )
}
