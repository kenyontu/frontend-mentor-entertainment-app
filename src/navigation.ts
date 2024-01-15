import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = ['en'] as const
export const localePrefix = 'always'

export type LocaleParam = {
  locale: typeof locales[number]
}

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix })
