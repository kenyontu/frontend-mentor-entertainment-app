import styles from './styles.module.scss'
import { Typography } from '~/ui/Typography'

type Props = {
  children: string
}

export function ShowSectionHeader({ children }: Props) {
  return (
    <Typography variant="h2" as="h1" className={styles.header}>
      {children}
    </Typography>
  )
}
