import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { DeleteBookmarkErrorResponse } from '~/lib/api/bookmarks'
import { allowedMethods } from '~/lib/apiMiddlewares'
import { prisma } from '~/lib/prisma'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteBookmarkErrorResponse>,
) {
  try {
    const token = await getToken({ req })
    if (!token) {
      return res.status(401).json({ message: 'User not authenticated' })
    }

    const showId = Number(req.query.id)
    if (isNaN(showId)) {
      return res.status(400).json({ message: 'Invalid show id' })
    }

    await prisma.showsOnUsers.deleteMany({
      where: { show: { id: showId }, user: { email: token.email! } },
    })

    res.status(204).end()
  } catch (error) {
    // TODO: Report error
    res.status(500).json({ message: 'Error while deleting bookmark' })
  }
}

export default allowedMethods(['DELETE'], handler)
