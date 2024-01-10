import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from '~/actions/users'

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await getUserByEmail(credentials.email)
          if (!user) {
            return null
          }

          const passwordMatches = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!passwordMatches) {
            return null
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: credentials.email,
          }
        } catch (error) {
          console.error(error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
})

export { handler as GET, handler as POST }
