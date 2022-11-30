import clsx from 'clsx'
import styles from './ShowListPageMain.module.scss'

type Props = { className?: string; children: React.ReactNode }

export function ShowListPageMain({ className, children }: Props) {
  return <main className={clsx(className, styles.main)}>{children}</main>
}
