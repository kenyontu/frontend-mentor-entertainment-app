import Image from 'next/image'

import styles from './styles.module.scss'
import { BookmarkButton } from '~/ui/shows/BookmarkButton'
import { PlayButton } from '~/ui/shows/PlayButton'
import { ShowInfo } from '~/ui/shows/ShowInfo'
import { Show } from '~/lib/db'

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
