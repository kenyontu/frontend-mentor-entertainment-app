import { db } from '.'
import { Category, Show, User } from './types'

export async function fetchUserByEmail(
  email: User['email']
): Promise<FetchRes<User | null>> {
  try {
    const user = await db
      .selectFrom('users')
      .select(['id', 'name', 'email', 'password'])
      .where('email', '=', email)
      .executeTakeFirst()

    return { status: 'success', data: user ?? null }
  } catch (error) {
    // TODO: Report error
    return { status: 'error' }
  }
}
