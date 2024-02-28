import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import styles from './styles.module.scss'
import { ShowItem } from '../ShowItem'
import { ShowSectionHeader } from '../ShowSectionHeader'
import { Show } from '~/lib/db'

type Props = {
  title: string
  emptyMsg?: string
  searchTerm?: string
  shows: Show[] | null
}

export async function ShowGrid({ title, searchTerm, shows, emptyMsg }: Props) {
  const t = await getTranslations('Shows')

  return (
    <section className={styles.container}>
      {Array.isArray(shows) ? (
        <>
          <ShowSectionHeader>
            {searchTerm
              ? t('searchResults', {
                  count: shows.length ?? 0,
                  searchTerm,
                })
              : title}
          </ShowSectionHeader>

          {shows.length > 0 ? (
            <div className={styles.grid}>
              {shows.map((show) => (
                <ShowItem key={show.id} show={show} />
              ))}
            </div>
          ) : (
            <p>{emptyMsg}</p>
          )}
        </>
      ) : (
        <>
          <ShowSectionHeader>{title}</ShowSectionHeader>
          <p className={styles.error}>{t('unableToLoadShowsError')}</p>
        </>
      )}
    </section>
  )
}

type LoadingShowGridProps = {
  title: string
}

export function LoadingShowGrid({ title }: LoadingShowGridProps) {
  const t = useTranslations('Shows')

  return (
    <section className={styles.container}>
      <ShowSectionHeader>{title}</ShowSectionHeader>
      <p>{t('loadingShows')}</p>
    </section>
  )
}
