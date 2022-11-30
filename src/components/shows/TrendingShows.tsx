import { Show } from '@prisma/client'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { TrendingShow } from '~/models/show'
import { LeftIcon } from '../icons/LeftIcon'
import { RightIcon } from '../icons/RightIcon'
import { TrendingShowItem } from './item/TrendingShowItem'
import { ShowSectionHeader } from './ShowSectionHeader'
import styles from './TrendingShows.module.scss'

type Props = {
  shows: TrendingShow[]
  renderItem: (show: TrendingShow) => React.ReactNode
}

export function TrendingShows({ shows, renderItem }: Props) {
  const listRef = useRef<HTMLDivElement>(null)

  // Refs of elements that sit at the start and end of the list. They
  // are used in combination with IntersectionObserver to detect when
  // the scrolling position is at the start or end of the list.
  const leftDummyRef = useRef(null)
  const rightDummyRef = useRef(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const leftDummy = leftDummyRef.current
    const rightDummy = rightDummyRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const canScroll = !isIntersecting

        if (target === leftDummy && canScrollLeft !== canScroll) {
          setCanScrollLeft(canScroll)
          return
        }

        if (target === rightDummy && canScrollRight !== canScroll) {
          setCanScrollRight(canScroll)
        }
      })
    }, { root: listRef.current, threshold: 1 })

    if (leftDummy) observer.observe(leftDummy)
    if (rightDummy) observer.observe(rightDummy)

    return () => {
      if (leftDummy) observer.unobserve(leftDummy)
      if (rightDummy) observer.unobserve(rightDummy)
    }
  })

  return (
    <section className={styles.container}>
      <ShowSectionHeader>Trending</ShowSectionHeader>

      <div className={styles.listWrapper}>
        <div className={styles.list} ref={listRef}>
          <div
            ref={leftDummyRef}
            className={`${styles.dummy} ${styles.left}`}
            key='leftDummy'
          >
          </div>

          {shows.map((show) => (
            renderItem(show)
          ))}

          <span
            ref={rightDummyRef}
            className={`${styles.dummy} ${styles.right}`}
            key='rightDummy'
          />
        </div>
        <button
          className={clsx(styles.scrollBtn, styles.left, {
            [styles.disabled]: !canScrollLeft,
          })}
          onClick={() => {
            if (listRef.current) {
              const distance = listRef.current.clientWidth * 0.75
              listRef.current.scroll({
                left: listRef.current.scrollLeft - distance,
                behavior: 'smooth',
              })
            }
          }}
        >
          <LeftIcon className={styles.scrollIcon} />
        </button>
        <button
          className={clsx(styles.scrollBtn, styles.right, {
            [styles.disabled]: !canScrollRight,
          })}
          onClick={() => {
            if (listRef.current) {
              const distance = listRef.current.clientWidth * 0.75
              listRef.current.scroll({
                left: listRef.current.scrollLeft + distance,
                behavior: 'smooth',
              })
            }
          }}
        >
          <RightIcon className={styles.scrollIcon} />
        </button>
      </div>
    </section>
  )
}
