import { Show } from '@prisma/client'
import Image from 'next/image'

import { TrendingShow } from '~/models/show'
import { BookmarkButton } from '../BookmarkButton'
import { PlayButton } from '../PlayButton'
import { ShowInfo } from './ShowInfo'
import styles from './TrendingShowItem.module.scss'

type Props = {
  show: TrendingShow
  preloadImage?: boolean
  showBookmarkButton?: boolean
  bookmarked?: boolean
  addBookmark: (showId: Show['id']) => void
  deleteBookmark: (showId: Show['id']) => void
}

export function TrendingShowItem(
  {
    show,
    preloadImage,
    bookmarked,
    addBookmark,
    deleteBookmark,
    showBookmarkButton,
  }: Props,
) {
  return (
    <article className={styles.container}>
      <Image
        className={styles.image}
        src={show.thumbnail?.trending?.large ?? ''}
        alt=''
        fill
        sizes='(min-width:768px) 70vw,
        70vw'
        priority={preloadImage}
      />

      <PlayButton className={styles.playBtn} />

      {showBookmarkButton && (
        <BookmarkButton
          bookmarked={bookmarked}
          className={styles.bookmarkBtn}
          onClick={() => {
            if (!bookmarked) {
              addBookmark(show.id)
            } else {
              deleteBookmark(show.id)
            }
          }}
        />
      )}

      <ShowInfo show={show} className={styles.info} />
    </article>
  )
}
