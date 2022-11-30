import { User } from '@prisma/client'
import { z } from 'zod'
import { FormErrorResponse } from './utils'

export const userSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  email: z.string().email('Not a valid email'),
  password: z.string().min(5, 'Must have a minimum of 5 characters'),
})

export type UserResponse = Omit<z.infer<typeof userSchema>, 'password'>

export type UserErrorResponse = FormErrorResponse<typeof userSchema>

export async function postUser(
  user: Omit<User, 'id'>,
): Promise<
  { success: true } & UserResponse | { success: false } & UserErrorResponse
> {
  try {
    const res = await fetch('/api/users', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const resBody = await res.json()
    return {
      success: res.ok,
      ...resBody,
    }
  } catch (error) {
    // TODO: Report error
    return { success: false, message: 'Error while creating the user' }
  }
}
