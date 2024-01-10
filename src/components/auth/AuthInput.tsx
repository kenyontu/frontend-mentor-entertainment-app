import { ComponentProps, forwardRef } from 'react'
import { TextInput } from '../TextInput'
import styles from './AuthInput.module.scss'

type Props = { error?: string } & ComponentProps<'input'>

export const AuthInput = forwardRef<HTMLInputElement, Props>(
  ({ error, ...rest }, ref) => {
    return (
      <TextInput
        ref={ref}
        inputProps={{ className: styles.input, ...rest }}
        alwaysShowUnderline
        error={error}
      />
    )
  }
)

AuthInput.displayName = 'AuthInput'
