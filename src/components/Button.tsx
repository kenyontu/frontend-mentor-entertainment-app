import clsx from 'clsx'
import { ComponentProps } from 'react'

import styles from './Button.module.scss'
import { Typography } from './Typography'

type Props = { loading?: boolean } & Omit<ComponentProps<'button'>, 'ref'>

export function Button({ loading, className, children, ...rest }: Props) {
  return (
    <Typography
      as='button'
      variant='body1'
      className={clsx(styles.button, className)}
      disabled={loading}
      {...rest}
    >
      <span className={clsx({ [styles.hidden]: loading })}>{children}</span>
      {loading && <div className={styles.spinner} />}
    </Typography>
  )
}
