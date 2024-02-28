import { ComponentProps } from 'react'
import clsx from 'clsx'

import styles from './styles.module.scss'
import { usePathname, Link } from '~/navigation'
import { BookmarkNavIcon } from '~/ui/icons/BookmarkNavIcon'
import { HomeNavIcon } from '~/ui/icons/HomeNavIcon'
import { MoviesNavIcon } from '~/ui/icons/MoviesNavIcon'
import { TVSeriesNavIcon } from '~/ui/icons/TVSeriesNavIcon'

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
