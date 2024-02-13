import 'dotenv/config'
import type { Config } from 'drizzle-kit'

if (!process.env.TURSO_DATABASE_URL) {
  throw new Error(`Env variable TURSO_DATABASE_URL is not defined`)
}

if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error(`Env variable TURSO_AUTH_TOKEN is not defined`)
}

export default {
  schema: './src/schema.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config
