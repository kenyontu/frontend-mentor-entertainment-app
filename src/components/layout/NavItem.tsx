import clsx from 'clsx'
import { ComponentProps } from 'react'
import { BookmarkNavIcon } from './icons/BookmarkNavIcon'
import { HomeNavIcon } from './icons/HomeNavIcon'
import { MoviesNavIcon } from './icons/MoviesNavIcon'
import { TVSeriesNavIcon } from './icons/TVSeriesNavIcon'

import styles from './NavItem.module.scss'
import { usePathname } from '~/navigation'
import { Link } from '~/navigation'

const icons = {
  home: HomeNavIcon,
  movies: MoviesNavIcon,
  tvseries: TVSeriesNavIcon,
  bookmarks: BookmarkNavIcon,
}

type Props = {
  icon: keyof typeof icons
} & ComponentProps<typeof Link>

export function NavItem({ icon, title, href, ...rest }: Props) {
  const pathname = usePathname()

  const active = pathname === href
  const Icon = icons[icon]

  return (
    <Link className={styles.link} href={href} {...rest}>
      <Icon className={clsx(styles.icon, { [styles.active]: active })} />
      <span className="sr-only">{title}</span>
    </Link>
  )
}
