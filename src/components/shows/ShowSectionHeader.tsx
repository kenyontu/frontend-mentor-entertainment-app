import { Typography } from '../Typography'
import styles from './ShowSectionHeader.module.scss'

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
