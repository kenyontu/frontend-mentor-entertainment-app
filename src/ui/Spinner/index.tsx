import clsx from 'clsx'

import styles from './styles.module.scss'

type Props = {
  className?: string
}

export function Spinner({ className }: Props) {
  return <div className={clsx(styles.spinner, className)}></div>
}
