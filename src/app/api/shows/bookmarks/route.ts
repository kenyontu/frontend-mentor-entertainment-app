import { getServerSession } from 'next-auth'
import { bookmarksTable, db } from '~/lib/db'
import { authOptions } from '../../auth/[...nextauth]/route'
import { eq } from 'drizzle-orm'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response('Not Authorized', { status: 401 })
  }

  const userId = parseInt(session.user.id)

  const bookmarks = await db
    .select({ showId: bookmarksTable.showId })
    .from(bookmarksTable)
    .where(eq(bookmarksTable.userId, userId))

  const show_ids = bookmarks.map((b) => b.showId)

  return new Response(JSON.stringify({ show_ids }), {
    status: 200,
  })
}
