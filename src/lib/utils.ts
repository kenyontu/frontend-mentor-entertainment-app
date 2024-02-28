export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

export function getSingleQueryValue(query?: string[] | string) {
  const result = query && (Array.isArray(query) ? query[0] : query)

  return typeof result === 'string' ? result : undefined
}
