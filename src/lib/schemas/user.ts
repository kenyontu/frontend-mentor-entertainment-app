import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  email: z.string().email('Not a valid email'),
  password: z.string().min(5, 'Must have a minimum of 5 characters'),
})
