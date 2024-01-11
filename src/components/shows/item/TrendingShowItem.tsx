import Image from 'next/image'

import { BookmarkButton } from '../BookmarkButton'
import { PlayButton } from '../PlayButton'
import { ShowInfo } from './ShowInfo'
import styles from './TrendingShowItem.module.scss'
import { Show } from '~/actions/shows'

type Props = {
  show: Show
  preloadImage?: boolean
  showBookmarkButton?: boolean
  bookmarked?: boolean
  addBookmark: () => void
  deleteBookmark: () => void
}

export function TrendingShowItem({
  show,
  preloadImage,
  bookmarked,
  addBookmark,
  deleteBookmark,
  showBookmarkButton,
}: Props) {
  return (
    <article className={styles.container}>
      <Image
        className={styles.image}
        src={getThumbnailUrl(show)}
        alt=""
        fill
        sizes="(min-width:768px) 70vw,
        70vw"
        priority={preloadImage}
      />

      <PlayButton className={styles.playBtn} />

      {showBookmarkButton && (
        <BookmarkButton
          bookmarked={bookmarked}
          className={styles.bookmarkBtn}
        />
      )}

      <ShowInfo show={show} className={styles.info} />
    </article>
  )
}

function getThumbnailUrl(show: Show) {
  return `/assets/thumbnails/${show.id}/trending/large.jpg`
}
