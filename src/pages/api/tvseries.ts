import { NextApiRequest, NextApiResponse } from 'next'

import { getSingleQueryValue } from '~/lib/utils'
import { getTVSeriesShows } from '~/models/show'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const searchTerm = getSingleQueryValue(req.query.s)
  const shows = await getTVSeriesShows(searchTerm)

  res.json(shows)
}
