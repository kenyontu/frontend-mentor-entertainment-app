import { z, ZodTypeAny } from 'zod'

export type FormErrorResponse<T extends ZodTypeAny> = {
  message?: string
  form?: z.inferFlattenedErrors<T>
}
