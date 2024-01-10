'use server'

import { z } from 'zod'
import bcrypt from 'bcrypt'

import { sql } from '~/lib/db'
import { userSchema } from '~/lib/schemas/user'

export type NewUser = z.infer<typeof userSchema>
export type UserFull = { id: number } & NewUser
export type User = Omit<UserFull, 'password'>

export async function createUser(newUser: NewUser): Promise<User> {
  const { name, email, password } = newUser
  const encryptedPassword = await hashPassword(password)

  const results = await sql`INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${encryptedPassword})
      RETURNING id, name, email;`

  return results[0] as User
}

export async function getUserByEmail(
  email: User['email']
): Promise<UserFull | null> {
  const results =
    await sql`SELECT id, name, email, password FROM users WHERE email=${email}`

  if (results.length == 0) {
    return null
  }

  return results[0] as UserFull
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
