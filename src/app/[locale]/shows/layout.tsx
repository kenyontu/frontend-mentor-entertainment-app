import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import { Header } from '~/components/layout/Header'
import { LocaleParam } from '~/navigation'

type Props = {
  children: React.ReactNode
  params: LocaleParam
}

export default function ShowsLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Shows')

  return (
    <>
      <Header
        t={{
          home: t('home'),
          shows: t('title'),
          movies: t('titleMovies'),
          tvSeries: t('titleTvSeries'),
          bookmarks: t('titleBookmarks'),
          signIn: t('signIn'),
          signOut: t('signOut'),
        }}
      />
      {children}
    </>
  )
}
