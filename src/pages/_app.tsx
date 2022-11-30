import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { Header } from '~/components/layout/Header'
import '../styles/globals.scss'

const showHeaderIn = new Set(['/', '/movies', '/tv-series', '/bookmarks'])

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const showHeader = showHeaderIn.has(router.pathname)

  return (
    <SessionProvider>
      {showHeader && <Header />}
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
