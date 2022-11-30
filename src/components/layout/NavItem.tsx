import clsx from 'clsx'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { BookmarkNavIcon } from './icons/BookmarkNavIcon'
import { HomeNavIcon } from './icons/HomeNavIcon'
import { MoviesNavIcon } from './icons/MoviesNavIcon'
import { TVSeriesNavIcon } from './icons/TVSeriesNavIcon'

import styles from './NavItem.module.scss'

const icons = {
  home: HomeNavIcon,
  movies: MoviesNavIcon,
  tvseries: TVSeriesNavIcon,
  bookmarks: BookmarkNavIcon,
}

type Props = {
  active?: boolean
  icon: keyof typeof icons
} & ComponentProps<typeof Link>

export function NavItem({ active, icon, title, ...rest }: Props) {
  const Icon = icons[icon]

  return (
    <Link className={styles.link} {...rest}>
      <Icon
        className={clsx(styles.icon, { [styles.active]: active })}
      />
      <span className='sr-only'>{title}</span>
    </Link>
  )
}
