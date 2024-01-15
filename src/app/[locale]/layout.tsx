import { unstable_setRequestLocale } from 'next-intl/server'

import '~/styles/globals.scss'
import { ShowBookmarksProvider } from '~/contexts/show_bookmarks_context'
import { ClientSessionProvider } from '~/contexts/session_context'
import { LocaleParam, locales } from '~/navigation'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = {
  children: React.ReactNode
  params: LocaleParam
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body>
        <ClientSessionProvider>
          <ShowBookmarksProvider>{children}</ShowBookmarksProvider>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
