export type ServerActionResult<R extends object> = Promise<
  ({ status: 'success' } & R) | { status: 'error'; error: Error }
>

export class ActionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ActionError'
  }
}

export class ValidationError<T extends object> extends Error {
  fieldErrors: { [key in keyof T]?: string }

  constructor(message: string, fieldErrors: { [key in keyof T]?: string }) {
    super(message)
    this.name = 'ValidationError'
    this.fieldErrors = fieldErrors
  }
}

export function isValidationError<T extends object>(
  error: ActionError | ValidationError<T>
): error is ValidationError<T> {
  return 'fieldErrors' in error
}
