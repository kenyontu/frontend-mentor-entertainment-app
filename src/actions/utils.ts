import { Session, getServerSession } from 'next-auth'
import { z } from 'zod'
import { toSingleErrorByField } from '~/lib/zodUtils'
import { getTranslationsSafely } from '~/i18n'
import { ActionError, ValidationError } from './types'

type ServerActOptions = {}

type ActOptions<D> = {
  session: Session | null
} & ({ data: D; error: null } | { data: null; error: Error })

/**
 * Converts a [FormData] object into a plan object with the field name as key and
 * field value as value.
 * If a field has multiple values as in the case of a `<select multiple>` element,
 * they will be in an Array
 */
export function formDataToObj(formData: FormData) {
  let obj: { [key: string]: any } = {}
  formData.forEach((value, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!Array.isArray(obj[key])) {
        obj = { ...obj, [key]: [obj[key]] }
      }
      obj[key].push(value)
    } else {
      obj = { ...obj, [key]: value }
    }
  })

  return obj
}

/**
 * Creates server action functions.
 *
 * Created functions have a single [FormData] parameter, so additional parameters
 * that are not shown in the form, should be included as the value of
 * <input type="hidden" /> elements
 */
export function createServerAct<
  Z extends z.ZodTypeAny,
  R extends { status: 'success' }
>(
  /**
   * A function which returns the Zod schema used to validate the [FormData] Object
   * received by the server action
   *
   * Having the schema being created in a separate async function allows the user
   * to translate error messages with [next-intl], while still being able to infer
   * the input type from the Zod schema
   */
  getInputSchema: () => Promise<Z>,
  options?: ServerActOptions
) {
  type Input = z.infer<Awaited<ReturnType<typeof getInputSchema>>>
  type ActError = {
    status: 'error'
    error: ActionError | ValidationError<{ [key in keyof Input]?: string }>
  }

  return (act: (options: ActOptions<Input>) => Promise<R | ActError>) => {
    return async (formData: FormData) => {
      try {
        const session = await getServerSession()

        const inputSchema = await getInputSchema()
        const valResult = inputSchema.safeParse(formDataToObj(formData))

        let data: Input | null = null
        let error: Error | null = null

        if (valResult.success) {
          data = valResult.data
        } else {
          const fieldErrors = toSingleErrorByField(valResult.error)
          error = new ValidationError('Validation failed', fieldErrors)
        }

        return act({ session, data, error })
      } catch (error) {
        // TODO: Report error

        let tError = await getTranslationsSafely('Error')
        return {
          status: 'error',
          error: new ActionError(
            tError ? tError('unexpectedError') : 'Unexpected error'
          ),
        } as ActError
      }
    }
  }
}

/**
 * Extracts the error type of a server action function created from [createServerAct]
 */
type ExtractError<
  F extends Awaited<ReturnType<ReturnType<typeof createServerAct>>>
> = Extract<Awaited<ReturnType<F>>, { status: 'error' }>

/**
 * Extracts the field Errors
 */
export type ExtractFieldErrors<
  F extends Awaited<ReturnType<ReturnType<typeof createServerAct>>>,
  E extends object = {}
> = NonNullable<
  Extract<ExtractError<F>['error'], ValidationError<E>>
>['fieldErrors']
