import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Typography } from '../Typography'
import styles from './Header.module.scss'
import { NavItem } from './NavItem'

type Props = {
  className?: string
}

export function Header({ className }: Props) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const router = useRouter()
  const session = useSession()

  return (
    <header className={clsx(styles.container, className)}>
      <div className={styles.content}>
        <Link href='/' title='Home' className={styles.logoLink}>
          <Image
            src='/assets/logo.svg'
            alt='Logo'
            width={25}
            height={20}
            className={styles.logo}
            aria-hidden
          />
          <span className='sr-only'>Home</span>
        </Link>
        <nav>
          <ul className={styles.menu}>
            <li>
              <NavItem
                icon='home'
                active={router.pathname === '/'}
                href='/'
                title='Home'
              />
            </li>
            <li>
              <NavItem
                icon='movies'
                active={router.pathname === '/movies'}
                href='/movies'
                title='Movies'
              />
            </li>
            <li>
              <NavItem
                icon='tvseries'
                active={router.pathname === '/tv-series'}
                href='/tv-series'
                title='TV Series'
              />
            </li>
            {session.status === 'authenticated' && (
              <li>
                <NavItem
                  icon='bookmarks'
                  active={router.pathname === '/bookmarks'}
                  href='/bookmarks'
                  title='Bookmarks'
                />
              </li>
            )}
          </ul>
        </nav>

        {session.status === 'authenticated'
          ? (
            <div className={styles.userIconWrapper}>
              <button
                className={styles.userBtn}
                onClick={() => setIsUserMenuOpen(true)}
              >
                <Typography
                  as='span'
                  variant='body1'
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
              >
              </div>
              <div
                className={clsx(styles.userMenu, {
                  [styles.open]: isUserMenuOpen,
                })}
              >
                <div className={styles.userMenuContent}>
                  <Typography
                    as='p'
                    variant='body1'
                    className={styles.userMenuUserName}
                  >
                    {session.data.user?.name}
                  </Typography>
                  <Typography
                    as='p'
                    variant='body1'
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
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )
          : (
            <Link href='/auth/signin' className={styles.signInBtn}>
              <Typography
                variant='body1'
                as='span'
              >
                Sign in
              </Typography>
            </Link>
          )}
      </div>
    </header>
  )
}
