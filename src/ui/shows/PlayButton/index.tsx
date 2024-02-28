import clsx from 'clsx'

import styles from './styles.module.scss'
import { Typography } from '~/ui/Typography'

type Props = { className?: string }

export function PlayButton({ className }: Props) {
  return (
    <button className={clsx(styles.button, className)}>
      <svg
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <path
          d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
          fill="#FFF"
        />
      </svg>
      <Typography as="span" variant="h4" className={styles.label}>
        Play
      </Typography>
    </button>
  )
}
