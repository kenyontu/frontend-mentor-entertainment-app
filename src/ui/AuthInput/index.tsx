import { ComponentProps, forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

import { TextInput } from '../TextInput'
import styles from './styles.module.scss'

type Props = { error?: string } & ComponentProps<'input'>

export const AuthInput = forwardRef<HTMLInputElement, Props>(
  ({ error, ...rest }, ref) => {
    const { pending } = useFormStatus()

    return (
      <TextInput
        ref={ref}
        inputProps={{ className: styles.input, ...rest }}
        alwaysShowUnderline
        error={!pending ? error : undefined}
      />
    )
  }
)

AuthInput.displayName = 'AuthInput'
