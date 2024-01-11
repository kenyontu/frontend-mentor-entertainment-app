import Head from 'next/head'

import { Header } from '~/components/layout/Header'

type Props = {
  children: React.ReactNode
}

export default function ShowsLayout({ children }: Props) {
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
