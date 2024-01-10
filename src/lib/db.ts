import postgres from 'postgres'

export const sql = postgres(
  'postgres://appuser:pass@localhost:5432/entertainment_app'
)
