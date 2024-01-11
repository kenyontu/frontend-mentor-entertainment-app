import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from '~/actions/users'

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
