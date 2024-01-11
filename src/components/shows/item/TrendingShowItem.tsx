import Image from 'next/image'

import { BookmarkButton } from '../BookmarkButton'
import { PlayButton } from '../PlayButton'
import { ShowInfo } from './ShowInfo'
import styles from './TrendingShowItem.module.scss'
import { Show } from '~/actions/shows'

type Props = {
  show: Show
  preloadImage?: boolean
}

export function TrendingShowItem({ show, preloadImage }: Props) {
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
      <BookmarkButton className={styles.bookmarkBtn} showId={show.id} />
      <ShowInfo show={show} className={styles.info} />
    </article>
  )
}

function getThumbnailUrl(show: Show) {
  return `/assets/thumbnails/${show.id}/trending/large.jpg`
}
