import { getShows } from '~/actions/shows'
import { SearchInput } from '~/components/SearchInput'
import { ShowListPageMain } from '~/components/layout/ShowListPageMain'
import { ShowGrid } from '~/components/shows/ShowGrid'
import { ShowItem } from '~/components/shows/item/ShowItem'
import { getSearchResultText, getSingleQueryValue } from '~/lib/utils'

type SearchParam = 's'

export default async function TVSeriesPage({
  searchParams,
}: {
  searchParams: Record<SearchParam, string | string[] | undefined>
}) {
  const searchInputParam: SearchParam = 's'
  const searchTerm = getSingleQueryValue(searchParams[searchInputParam])

  const shows = await getShows({ searchTerm, category: 'tv-series' })

  return (
    <ShowListPageMain>
      <SearchInput
        searchParamName={searchInputParam}
        inputProps={{
          placeholder: 'Search for TV series',
        }}
      />

      <ShowGrid
        title={
          searchTerm
            ? getSearchResultText(shows.length ?? 0, searchTerm)
            : 'TV Series'
        }
        shows={shows || []}
        renderItem={(show) => <ShowItem key={show.id} show={show} />}
      />
    </ShowListPageMain>
  )
}
