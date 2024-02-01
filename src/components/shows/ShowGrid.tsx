import styles from './ShowGrid.module.scss'
import { ShowItem } from './item/ShowItem'
import { useTranslations } from 'next-intl'
import { ShowSectionHeader } from './ShowSectionHeader'
import { Show } from '~/lib/db'
import { getTranslations } from 'next-intl/server'

type Props = {
  title: string
  searchTerm?: string
  shows: Show[] | null
}

export async function ShowGrid({ title, searchTerm, shows }: Props) {
  const t = await getTranslations('Shows')

  return (
    <section className={styles.container}>
      {shows !== null ? (
        <>
          <ShowSectionHeader>
            {searchTerm
              ? t('searchResults', {
                  count: shows.length ?? 0,
                  searchTerm,
                })
              : title}
          </ShowSectionHeader>

          <div className={styles.grid}>
            {shows.map((show) => (
              <ShowItem key={show.id} show={show} />
            ))}
          </div>
        </>
      ) : (
        <>
          <ShowSectionHeader>{title}</ShowSectionHeader>
          <p className={styles.error}>{t('loadingShows')}</p>
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
