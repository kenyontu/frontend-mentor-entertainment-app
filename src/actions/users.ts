'use server'

import bcrypt from 'bcrypt'
import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

import { DatabaseError, db, DbConstraints, DbErrorCodes } from '~/lib/db'
import { createServerAct } from './utils'
import { getTranslationsSafely } from '~/i18n'

export const createUser = createServerAct(async () => {
  const t = await getTranslations('SignUp')
  return z
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
})(async ({ data, error }) => {
  if (error) {
    return error
  }

  try {
    const { name, email, password } = data
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

    return { status: 'success', userId: res.id }
  } catch (error) {
    if (error instanceof DatabaseError) {
      if (
        error.code === DbErrorCodes.uniqueViolation &&
        error.constraint === DbConstraints.userEmailUnique
      ) {
        let tSignUp = await getTranslationsSafely('SignUp')
        return {
          status: 'error',
          validationErrors: {
            email: tSignUp
              ? tSignUp('emailAlreadyInUseError')
              : 'Email already in use',
          },
        }
      }
    }

    let tError = await getTranslationsSafely('Error')

    return {
      status: 'error',
      message: tError ? tError('unexpectedError') : 'Unexpected error',
    }
  }
})

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
