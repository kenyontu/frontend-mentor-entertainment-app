'use client'

import clsx from 'clsx'
import styles from './BookmarkButton.module.scss'
import { useShowBookmark } from '~/contexts/show_bookmarks_context'
import { useSession } from 'next-auth/react'
import { Show } from '~/lib/db'

type Props = { showId: Show['id']; className?: string }

export function BookmarkButton({ showId, className }: Props) {
  const session = useSession()
  const { bookmarked, toggleBookmark } = useShowBookmark(showId)

  if (session.status !== 'authenticated') {
    return null
  }

  return (
    <button
      className={clsx(styles.button, className)}
      onClick={() => toggleBookmark()}
      role="switch"
      aria-checked={bookmarked}
    >
      <svg
        viewBox="0 0 12 14"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(styles.icon, { [styles.bookmarked]: bookmarked })}
        aria-hidden
      >
        <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" />
      </svg>
      <span className="sr-only">Bookmarked</span>
    </button>
  )
}
