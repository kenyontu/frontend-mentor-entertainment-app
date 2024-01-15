'use server'

import bcrypt from 'bcrypt'

import { db, User, NewUser } from '~/lib/db'

export async function createUser(newUser: NewUser): Promise<User['id']> {
  const { name, email, password } = newUser
  const encryptedPassword = await hashPassword(password)

  const res = await db
    .insertInto('users')
    .values({
      name,
      email,
      password: encryptedPassword,
    })
    .returning(['id'])
    .executeTakeFirstOrThrow()

  return res.id
}

export async function getUserByEmail(
  email: User['email']
): Promise<User | undefined> {
  return db
    .selectFrom('users')
    .select(['id', 'name', 'email', 'password'])
    .where('email', '=', email)
    .executeTakeFirst()
}

function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const saltRounds = 10
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        reject(err)
        return
      }

      resolve(hash)
    })
  })
}
