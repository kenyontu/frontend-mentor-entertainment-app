import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'

import styles from './TextInput.module.scss'
import { Typography } from './Typography'

type Props = {
  className?: string
  alwaysShowUnderline?: boolean
  inputProps?: ComponentProps<'input'>
  error?: string
}

export const TextInput = forwardRef<HTMLInputElement, Props>(({
  className,
  alwaysShowUnderline,
  inputProps: { className: inputClassName, ...inputProps } = {},
  error,
}, ref) => {
  return (
    <div className={clsx(styles.container, className)}>
      <input
        className={clsx(styles.input, inputClassName)}
        ref={ref}
        {...inputProps}
      />
      <span
        className={clsx(styles.underline, {
          [styles.alwaysVisible]: alwaysShowUnderline,
          [styles.error]: error,
        })}
      />
      {error && (
        <Typography as='span' variant='body1' className={styles.errorMessage}>
          {error}
        </Typography>
      )}
    </div>
  )
})

TextInput.displayName = 'TextInput'
