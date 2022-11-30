import { Show } from '@prisma/client'
import Image from 'next/image'

import { ShowWithThumbnail } from '~/models/show'
import { BookmarkButton } from '../BookmarkButton'
import { PlayButton } from '../PlayButton'
import { ShowInfo } from './ShowInfo'
import styles from './ShowItem.module.scss'

type Props = {
  show: ShowWithThumbnail
  showBookmarkButton?: boolean
  bookmarked?: boolean
  addBookmark: (showId: Show['id']) => void
  deleteBookmark: (showId: Show['id']) => void
}

export function ShowItem(
  { show, bookmarked, addBookmark, deleteBookmark, showBookmarkButton }: Props,
) {
  return (
    <article>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={show.thumbnail?.regular?.large ?? ''}
          alt={`Picture for the '${show.title}' show`}
          fill
          sizes='(max-width: 376px) 40vw,
                 (max-width: 768px) 30vw,
                 (max-width: 1024px) 33vw'
          aria-hidden
        />

        <PlayButton className={styles.playBtn} />

        {showBookmarkButton && (
          <BookmarkButton
            className={styles.bookmarkBtn}
            bookmarked={bookmarked}
            onClick={() => {
              if (!bookmarked) {
                addBookmark(show.id)
              } else {
                deleteBookmark(show.id)
              }
            }}
          />
        )}
      </div>
      <ShowInfo show={show} className={styles.showInfo} />
    </article>
  )
}
