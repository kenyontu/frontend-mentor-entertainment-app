import { ShowWithThumbnail } from '~/models/show'
import styles from './ShowGrid.module.scss'
import { ShowSectionHeader } from './ShowSectionHeader'

type Props = {
  shows: ShowWithThumbnail[]
  title: string
  renderItem: (show: ShowWithThumbnail) => React.ReactNode
}

export function ShowGrid({ title, shows, renderItem }: Props) {
  return (
    <section className={styles.container}>
      <ShowSectionHeader>{title}</ShowSectionHeader>

      <div className={styles.grid}>
        {shows.map((show) => (
          renderItem(show)
        ))}
      </div>
    </section>
  )
}
