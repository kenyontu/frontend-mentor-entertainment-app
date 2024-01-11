import Image from 'next/image'

import styles from './ShowItem.module.scss'
import { ShowWithThumbnail } from '~/models/show'
import { BookmarkButton } from '../BookmarkButton'
import { PlayButton } from '../PlayButton'
import { ShowInfo } from './ShowInfo'
import { Show } from '~/actions/shows'

type Props = {
  show: ShowWithThumbnail
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
        <BookmarkButton className={styles.bookmarkBtn} bookmarked={false} />
      </div>
      <ShowInfo show={show} className={styles.showInfo} />
    </article>
  )
}

function getThumbnailUrl(show: Show) {
  return `/assets/thumbnails/${show.id}/regular/large.jpg`
}
