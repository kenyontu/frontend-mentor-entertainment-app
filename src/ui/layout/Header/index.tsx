'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import clsx from 'clsx'

import styles from './styles.module.scss'
import { Typography } from '~/ui/Typography'
import { NavItem } from '../NavItem'
import { Link } from '~/navigation'

type Props = {
  className?: string
  t: {
    home: string
    shows: string
    movies: string
    tvSeries: string
    bookmarks: string
    signIn: string
    signOut: string
  }
}

export function Header({ className, t }: Props) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const session = useSession()

  return (
    <header className={clsx(styles.container, className)}>
      <div className={styles.content}>
        <Link href="/" title={t.home} className={styles.logoLink}>
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={25}
            height={20}
            className={styles.logo}
            aria-hidden="true"
            priority={true}
          />
          <span className="sr-only">{t.home}</span>
        </Link>
        <nav>
          <ul className={styles.menu}>
            <li>
              <NavItem icon="home" href="/shows" title={t.shows} />
            </li>
            <li>
              <NavItem icon="movies" href="/shows/movies" title={t.movies} />
            </li>
            <li>
              <NavItem
                icon="tvseries"
                href="/shows/tvseries"
                title={t.tvSeries}
              />
            </li>
            {session.status === 'authenticated' && (
              <li>
                <NavItem
                  icon="bookmarks"
                  href="/shows/bookmarks"
                  title={t.bookmarks}
                />
              </li>
            )}
          </ul>
        </nav>

        {session.status === 'authenticated' && (
          <div className={styles.userIconWrapper}>
            <button
              className={styles.userBtn}
              onClick={() => setIsUserMenuOpen(true)}
            >
              <Typography
                as="span"
                variant="body1"
                className={styles.userIconText}
              >
                {session.data.user?.name?.[0]}
              </Typography>
            </button>

            <div
              className={clsx(styles.userMenuBackdrop, {
                [styles.open]: isUserMenuOpen,
              })}
              onClick={() => setIsUserMenuOpen(false)}
            ></div>
            <div
              className={clsx(styles.userMenu, {
                [styles.open]: isUserMenuOpen,
              })}
            >
              <div className={styles.userMenuContent}>
                <Typography
                  as="p"
                  variant="body1"
                  className={styles.userMenuUserName}
                >
                  {session.data.user?.name}
                </Typography>
                <Typography
                  as="p"
                  variant="body1"
                  className={styles.userMenuEmail}
                >
                  {session.data.user?.email}
                </Typography>
              </div>
              <div className={styles.signOutBtnContainer}>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={styles.signOutBtn}
                >
                  {t.signOut}
                </button>
              </div>
            </div>
          </div>
        )}
        {session.status === 'unauthenticated' && (
          <Link href="/auth/signin" className={styles.signInBtn}>
            <Typography variant="body1" as="span">
              {t.signIn}
            </Typography>
          </Link>
        )}
      </div>
    </header>
  )
}
