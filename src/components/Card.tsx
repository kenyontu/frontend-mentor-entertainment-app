import clsx from 'clsx'
import { ComponentProps } from 'react'

import styles from './Card.module.scss'

type Props = ComponentProps<'div'>

export function Card({ className, children, ...rest }: Props) {
  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {children}
    </div>
  )
}
