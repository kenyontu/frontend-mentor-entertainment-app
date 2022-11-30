import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { prisma } from '~/lib/prisma'

export default NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Unable to authenticate user')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error('Incorrect email or password')
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user.password,
        )

        if (!passwordMatches) {
          throw new Error('Incorrect email or password')
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: credentials.email,
        }
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },
})
