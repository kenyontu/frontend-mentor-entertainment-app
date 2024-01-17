'use server'

import bcrypt from 'bcrypt'
import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

import { DatabaseError, db, DbConstraints, DbErrorCodes, User } from '~/lib/db'
import { toSingleErrorByField } from '~/lib/zodUtils'

export async function createUser(formData: FormData) {
  const t = await getTranslations('SignUp')

  try {
    const newUserSchema = z
      .object({
        name: z.string({ required_error: t('emptyFieldError') }),
        email: z
          .string({ required_error: t('emptyFieldError') })
          .email(t('emailInvalidError')),
        password: z
          .string({ required_error: t('emptyFieldError') })
          .min(5, t('passwordMinimumLengthError', { length: 5 })),
        confirmPassword: z.string({ required_error: t('emptyFieldError') }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: t('passwordsDontMatchError'),
        path: ['confirmPassword'],
      })

    const validatedFields = newUserSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    })

    if (!validatedFields.success) {
      return {
        ok: false,
        fieldErrors: toSingleErrorByField(validatedFields.error),
      }
    }

    const { name, email, password } = validatedFields.data
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

    return { ok: true, userId: res.id }
  } catch (error) {
    if (error instanceof DatabaseError) {
      if (
        error.code === DbErrorCodes.uniqueViolation &&
        error.constraint === DbConstraints.userEmailUnique
      ) {
        return {
          ok: false,
          fieldErrors: { email: t('emailAlreadyInUseError') },
        }
      }
    }

    // TODO: Report unexpected error
    return { ok: false, formError: t('requestError') }
  }
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
