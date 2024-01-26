import { notFound } from 'next/navigation'
import { getRequestConfig, getTranslations } from 'next-intl/server'
import { locales } from './navigation'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

export type GetTranslationFn = Awaited<ReturnType<typeof getTranslations>>

/**
 * Returns [null] instead of throwing when the call to [getTranslations] fails
 */
export function getTranslationsSafely(namespace?: string) {
  return getTranslations(namespace).catch((error) => {
    // TODO: Report error
    return null
  })
}
