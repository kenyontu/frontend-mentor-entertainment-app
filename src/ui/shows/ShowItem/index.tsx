import Image from 'next/image'

import styles from './styles.module.scss'
import { BookmarkButton } from '../BookmarkButton'
import { PlayButton } from '../PlayButton'
import { ShowInfo } from '../ShowInfo'
import { Show } from '~/lib/db'

type Props = {
  show: Show
}

export function ShowItem({ show }: Props) {
  return (
    <article>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={getThumbnailUrl(show)}
          alt={`Picture for the '${show.title}' show`}
          fill
          sizes="(max-width: 376px) 40vw,
                 (max-width: 768px) 30vw,
                 (max-width: 1024px) 33vw"
          aria-hidden
        />

        <PlayButton className={styles.playBtn} />
        <BookmarkButton className={styles.bookmarkBtn} showId={show.id} />
      </div>
      <ShowInfo show={show} className={styles.showInfo} />
    </article>
  )
}

function getThumbnailUrl(show: Show) {
  return `/assets/thumbnails/${show.id}/regular/large.jpg`
}
