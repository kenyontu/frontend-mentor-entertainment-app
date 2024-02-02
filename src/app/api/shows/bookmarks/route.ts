import { getServerSession } from 'next-auth'
import { db } from '~/lib/db'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response('Not Authorized', { status: 401 })
  }

  const userId = parseInt(session.user.id)

  const res = await db
    .selectFrom('bookmarks')
    .where('user_id', '=', userId)
    .select('show_id')
    .execute()

  const show_ids = res.map((show) => show.show_id)

  return new Response(JSON.stringify({ show_ids }), {
    status: 200,
  })
}
