import { ShowBookmarksProvider } from '~/contexts/show_bookmarks_context'
import '../styles/globals.scss'
import { ClientSessionProvider } from '~/contexts/session_context'

type Props = { children: React.ReactNode }

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          <ShowBookmarksProvider>{children}</ShowBookmarksProvider>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
