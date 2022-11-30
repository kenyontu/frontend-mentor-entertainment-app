import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { allowedMethods } from '~/lib/apiMiddlewares'

import { getSingleQueryValue } from '~/lib/utils'
import { getBookmarkedShows, getShows } from '~/models/show'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const searchTerm = getSingleQueryValue(req.query.s)
  const bookmarkedOnly = getSingleQueryValue(req.query.b)

  if (bookmarkedOnly) {
    const token = await getToken({ req })

    if (!token) {
      return res.status(401).json({ message: 'User not authenticated' })
    }

    const bookmarkedShows = await getBookmarkedShows(token.email!, searchTerm)
    return res.status(200).json(bookmarkedShows)
  }

  const shows = await getShows(searchTerm)
  res.status(200).json(shows)
}

export default allowedMethods(['GET'], handler)
