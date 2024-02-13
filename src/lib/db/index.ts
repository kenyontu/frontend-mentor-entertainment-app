import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

export * from './types'

export const DbErrorCodes = {
  uniqueViolation: '23505',
}

export const DbConstraints = {
  userEmailUnique: 'users_email_key',
}

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})
export const db = drizzle(client)
