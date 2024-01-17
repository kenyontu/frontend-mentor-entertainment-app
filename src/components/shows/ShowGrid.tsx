import { Show } from '~/lib/db'
import styles from './ShowGrid.module.scss'
import { ShowSectionHeader } from './ShowSectionHeader'

type Props = {
  shows: Show[]
  title: string
  renderItem: (show: Show) => React.ReactNode
}

export function ShowGrid({ title, shows, renderItem }: Props) {
  return (
    <section className={styles.container}>
      <ShowSectionHeader>{title}</ShowSectionHeader>

      <div className={styles.grid}>{shows.map((show) => renderItem(show))}</div>
    </section>
  )
}
