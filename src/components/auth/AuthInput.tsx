import { ComponentProps, forwardRef } from 'react'
import { TextInput } from '../TextInput'
import styles from './AuthInput.module.scss'
import { useFormStatus } from 'react-dom'

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
