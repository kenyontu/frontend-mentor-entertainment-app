import Image from 'next/image'

import styles from './ShowInfo.module.scss'
import { Typography } from '~/components/Typography'
import { Show } from '~/lib/db'
import { useTranslations } from 'next-intl'

const translationKeyByCategory: Record<Show['category_id'], string> = {
  movie: 'categoryMovie',
  'tv-series': 'categoryTvSeries',
}

const translationKeyByRating: Record<Show['rating_id'], string> = {
  e: 'ratingE',
  pg: 'ratingPg',
  '18+': 'rating18+',
}

type Props = {
  className?: string
  show: Show
}

export function ShowInfo({ show, className }: Props) {
  const t = useTranslations('Shows')

  const category = t(translationKeyByCategory[show.category_id])
  const rating = t(translationKeyByRating[show.rating_id])

  const divider = <span className={styles.divider}>•</span>

  return (
    <div className={className}>
      <Typography as="p" variant="body1" className={styles.info}>
        {show.year}
        {divider}
        {show.category_id === 'movie' ? (
          <Image
            src="/assets/icon-category-movie.svg"
            width={12}
            height={12}
            alt=""
            className={styles.categoryIcon}
            aria-hidden
          />
        ) : show.category_id === 'tv-series' ? (
          <Image
            src="/assets/icon-category-tv.svg"
            width={12}
            height={12}
            alt=""
            className={styles.categoryIcon}
            aria-hidden
          />
        ) : null}
        {category}
        {divider}
        {rating}
      </Typography>
      <Typography as="h2" variant="h4" className={styles.title}>
        {show.title}
      </Typography>
    </div>
  )
}
