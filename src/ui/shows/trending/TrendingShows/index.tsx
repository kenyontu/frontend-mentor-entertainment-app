import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import styles from './styles.module.scss'
import { TrendingShowItem } from '../TrendingShowsItem'
import { TrendingShowsContainer } from '../TrendingShowsContainer'
import { fetchTrendingShows } from '~/lib/db/data'

export async function TrendingShows() {
  const t = await getTranslations('Shows')
  const res = await fetchTrendingShows()

  if (res.status === 'error') {
    return (
      <section className={styles.messageContainer}>
        <p>{t('unableToLoadTrendingShowsError')}</p>
      </section>
    )
  }

  return (
    <TrendingShowsContainer
      t={{
        srScrollLeft: t('srScrollLeft'),
        srScrollRight: t('srScrollRight'),
      }}
    >
      {res.data.map((show, index) => (
        <TrendingShowItem
          key={show.id}
          show={show}
          preloadImage={index === 0}
        />
      ))}
    </TrendingShowsContainer>
  )
}

export function LoadingTrendingShows() {
  const t = useTranslations('Shows')

  return (
    <section className={styles.messageContainer}>
      <p>{t('loadingTrendingShows')}</p>
    </section>
  )
}
