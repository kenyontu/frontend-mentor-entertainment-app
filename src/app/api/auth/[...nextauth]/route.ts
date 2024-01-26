import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { fetchUserByEmail } from '~/lib/db/data'

export type AuthErrorCode = 'unexpectedError'

export const authOptions: AuthOptions = {
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

        const userRes = await fetchUserByEmail(credentials.email)
        if (userRes?.status === 'error') {
          // TODO: Report error
          throw new Error('unexpectedError' as AuthErrorCode)
        }

        if (!userRes?.data) {
          // User not found
          return null
        }

        const user = userRes.data
        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatches) {
          // Password does not match
          return null
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: credentials.email,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
