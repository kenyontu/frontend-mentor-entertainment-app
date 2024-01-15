import { unstable_setRequestLocale } from 'next-intl/server'
import Head from 'next/head'

import { Header } from '~/components/layout/Header'
import { LocaleParam } from '~/navigation'

type Props = {
  children: React.ReactNode
  params: LocaleParam
}

export default function ShowsLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <Head>
        <title>Frontend Mentor | Entertainment web app</title>
        <meta name="description" content="Watch Movies and TV series" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
      </Head>

      <Header />
      {children}
    </>
  )
}
