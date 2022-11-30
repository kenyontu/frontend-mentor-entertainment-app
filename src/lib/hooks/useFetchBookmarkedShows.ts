import useSWR from 'swr'
import { ShowWithThumbnail } from '~/models/show'

export function useFetchBookmarkedShows(
  searchTerm = '',
) {
  const searchParam = searchTerm ? `&s=${encodeURIComponent(searchTerm)}` : ''

  const url = `/api/shows?b=true${searchParam}`

  const { data, error } = useSWR<ShowWithThumbnail[]>(
    url,
    (url) => fetch(url).then((r) => r.json()),
  )

  return { data, error }
}
