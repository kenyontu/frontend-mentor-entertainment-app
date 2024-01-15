import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

import { Database } from './types'
export * from './types'

const dialect = new PostgresDialect({
  pool: new Pool(),
})

export const db = new Kysely<Database>({
  dialect,
})
