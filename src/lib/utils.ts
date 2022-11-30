export function assert(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

export function getSingleQueryValue(query?: string[] | string) {
  const result = query && (Array.isArray(query) ? query[0] : query)

  return typeof result === 'string' ? result : undefined
}

export function getSearchResultText(
  length: number,
  searchTerm: string,
) {
  if (length > 1) {
    return `Found ${length} results for '${searchTerm}'`
  }

  if (length === 1) {
    return `Found 1 result for '${searchTerm}'`
  }

  return `No result for '${searchTerm}'`
}
