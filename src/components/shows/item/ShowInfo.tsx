import Image from 'next/image'

import styles from './ShowInfo.module.scss'
import { Typography } from '~/components/Typography'
import { Show } from '~/lib/db'
import { useTranslations } from 'next-intl'

const translationKeyByCategory: Record<Show['categoryId'], string> = {
  movie: 'categoryMovie',
  'tv-series': 'categoryTvSeries',
}

const translationKeyByRating: Record<Show['ratingId'], string> = {
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

  const category = t(translationKeyByCategory[show.categoryId])
  const rating = t(translationKeyByRating[show.ratingId])

  const divider = <span className={styles.divider}>•</span>

  return (
    <div className={className}>
      <Typography as="p" variant="body1" className={styles.info}>
        {show.year}
        {divider}
        {show.categoryId === 'movie' ? (
          <Image
            src="/assets/icon-category-movie.svg"
            width={12}
            height={12}
            alt=""
            className={styles.categoryIcon}
            aria-hidden
          />
        ) : show.categoryId === 'tv-series' ? (
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
