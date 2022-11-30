import useSWR from 'swr'
import { ShowWithThumbnail } from '~/models/show'

export function useFetchShows(
  apiPath: string,
  searchTerm?: string,
  fallbackData?: ShowWithThumbnail[],
) {
  const searchParam = searchTerm ? `?s=${encodeURIComponent(searchTerm)}` : ''

  const url = `${apiPath}${searchParam}`

  return useSWR<ShowWithThumbnail[]>(
    url,
    (url) => fetch(url).then((r) => r.json()),
    {
      fallbackData: searchTerm ? undefined : fallbackData,
    },
  )
}
