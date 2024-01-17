import { ZodError } from 'zod'

export function toSingleErrorByField<T>(error: ZodError<T>) {
  const { fieldErrors } = error.flatten()

  type Fields = keyof typeof fieldErrors

  const ret = (Object.keys(fieldErrors) as Array<Fields>).reduce(
    (acc, key: Fields) => {
      const error = fieldErrors[key]
      if (Array.isArray(error) && error.length > 0) {
        return { ...acc, [key]: error[0] }
      }
      return acc
    },
    {} as { [key in Fields]?: string }
  )
  return ret
}
