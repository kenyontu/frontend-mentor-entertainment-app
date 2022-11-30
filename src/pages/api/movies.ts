import { NextApiRequest, NextApiResponse } from 'next'

import { getSingleQueryValue } from '~/lib/utils'
import { getMovieShows } from '~/models/show'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const searchTerm = getSingleQueryValue(req.query.s)
  const shows = await getMovieShows(searchTerm)

  res.json(shows)
}
