import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import { UserErrorResponse, UserResponse, userSchema } from '~/lib/api/users'
import { allowedMethods } from '~/lib/apiMiddlewares'
import { createUser } from '~/models/user'

function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | UserErrorResponse>,
) {
  const parseResult = userSchema.safeParse(req.body)

  if (!parseResult.success) {
    return res.status(400).json({
      form: parseResult.error.flatten(),
    })
  }

  createUser(parseResult.data).then(user => {
    res.status(201).json({
      name: user.name,
      email: user.email,
    })
  }).catch((error) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({
          form: {
            fieldErrors: {
              email: ['Email already in use'],
            },
            formErrors: [],
          },
        })
      }
    }

    res.status(500).json(
      {
        message: 'Error while creating the user',
      },
    )
  })
}

export default allowedMethods(['POST'], handler)
