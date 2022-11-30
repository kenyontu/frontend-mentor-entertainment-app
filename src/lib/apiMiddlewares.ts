import { NextApiRequest, NextApiResponse } from 'next'

export function allowedMethods(
  methods: string[],
  apiHandler: (req: NextApiRequest, res: NextApiResponse) => void,
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (!methods.includes(req.method!)) {
      return res.status(405).json({
        message: 'Method not allowed',
      })
    }

    return apiHandler(req, res)
  }
}
