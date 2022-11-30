import { Show } from '@prisma/client'
import Image from 'next/image'

import { Typography } from '~/components/Typography'
import styles from './ShowInfo.module.scss'

type Props = {
  className?: string
  show: Show
}

export function ShowInfo({ show, className }: Props) {
  const divider = <span className={styles.divider}>•</span>

  return (
    <div className={className}>
      <Typography as='p' variant='body1' className={styles.info}>
        {show.year}
        {divider}
        {show.category === 'Movie'
          ? (
            <Image
              src='/assets/icon-category-movie.svg'
              width={12}
              height={12}
              alt=''
              className={styles.categoryIcon}
              aria-hidden
            />
          )
          : show.category === 'TV Series'
          ? (
            <Image
              src='/assets/icon-category-tv.svg'
              width={12}
              height={12}
              alt=''
              className={styles.categoryIcon}
              aria-hidden
            />
          )
          : null}
        {show.category}
        {divider}
        {show.rating}
      </Typography>
      <Typography as='h2' variant='h4' className={styles.title}>
        {show.title}
      </Typography>
    </div>
  )
}
