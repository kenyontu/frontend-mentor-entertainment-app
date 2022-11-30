import useSWR from 'swr'
import { TrendingShow } from '~/models/show'

export function useFetchTrendingShows(
  fallbackData?: TrendingShow[],
) {
  const url = '/api/trending'

  return useSWR<TrendingShow[]>(
    url,
    (url) => fetch(url).then((r) => r.json()),
    {
      fallbackData,
    },
  )
}
