import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

import { Database } from './types'

export { DatabaseError } from 'pg'
export * from './types'

export const DbErrorCodes = {
  uniqueViolation: '23505',
}

export const DbConstraints = {
  userEmailUnique: 'users_email_key',
}

const dialect = new PostgresDialect({
  pool: new Pool(),
})

export const db = new Kysely<Database>({
  dialect,
})
