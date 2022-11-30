import { NextApiRequest, NextApiResponse } from 'next'

import { getTrendingShows } from '~/models/show'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const shows = await getTrendingShows()

  res.json(shows)
}
