import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'

import {
  GetBookmarksErrorResponse,
  GetBookmarksResponse,
  PostBookmarkError,
} from '~/lib/api/bookmarks'
import { allowedMethods } from '~/lib/apiMiddlewares'
import { prisma } from '~/lib/prisma'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const token = await getToken({ req })
    if (!token) {
      return res.status(401).send({ message: 'User not authenticated' })
    }

    if (req.method === 'GET') {
      await handleGet(req, res, token)
      return
    }

    if (req.method === 'POST') {
      await handlePost(req, res, token)
      return
    }

    throw new Error(
      `This API handler received a request of an unexpected method: ${req.method}.
Check if the [allowedMethods] middleware was added or if it is correct`,
    )
  } catch (error) {
    // TODO: Report error
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Show already bookmarked' })
      }
    }

    return res.status(500).json({
      message: 'Error while retrieving user bookmarks',
    })
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<GetBookmarksResponse | GetBookmarksErrorResponse>,
  token: JWT,
) {
  const shows = await prisma.show.findMany({
    where: { bookmarkedBy: { some: { user: { email: token.email! } } } },
    select: { id: true },
  })

  const ids = shows.map(show => show.id)

  res.status(200).json({ bookmarks: ids })
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<PostBookmarkError>,
  token: JWT,
) {
  if (!req.body.showId) {
    return res.status(400).send({ message: 'Missing show id' })
  }

  const showId = Number(req.body.showId)
  if (isNaN(showId)) {
    return res.status(400).send({ message: 'Invalid show id' })
  }

  await prisma.user.update({
    where: { email: token.email as string },
    data: {
      bookmarks: {
        create: [{
          show: { connect: { id: showId } },
        }],
      },
    },
  })

  res.status(201).end()
}

export default allowedMethods(['GET', 'POST'], handler)
