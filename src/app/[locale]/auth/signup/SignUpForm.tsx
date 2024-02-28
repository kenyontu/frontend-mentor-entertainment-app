'use client'

import { signIn } from 'next-auth/react'
import { useFormState, useFormStatus } from 'react-dom'
import Image from 'next/image'

import styles from '~/styles/Auth.module.scss'
import { AuthInput } from '~/ui/AuthInput'
import { Button } from '~/ui/Button'
import { Card } from '~/ui/Card'
import { Typography } from '~/ui/Typography'
import { createUser } from '~/actions/users'
import { Link, useRouter } from '~/navigation'
import { ExtractError } from '~/actions/utils'

type Props = {
  passwordMinLength: number
  t: {
    title: string
    requestError: string
    autoSignInError: string
    emailAddress: string
    name: string
    password: string
    repeatPassword: string
    createAccount: string
    alreadyHaveAccount: string
    signIn: string
  }
}

type CreateUserError = ExtractError<typeof createUser>
type FormState = {
  error?: CreateUserError['message']
  validationErrors?: CreateUserError['validationErrors']
}

export function SignUpForm({ passwordMinLength, t }: Props) {
  const router = useRouter()
  const [formState, formAction] = useFormState<FormState, FormData>(
    async (prevState, formData) => {
      try {
        const createUserRes = await createUser(formData)

        if (createUserRes.status === 'error') {
          return {
            error: createUserRes.message,
            validationErrors: createUserRes.validationErrors,
          }
        }

        const res = await signIn('credentials', {
          email: formData.get('email'),
          password: formData.get('password'),
          redirect: false,
        })

        if (res?.ok) {
          router.replace('/')
        } else {
          return {
            error: t.autoSignInError,
          }
        }

        return prevState
      } catch (error) {
        // TODO: Report error
        return { error: t.requestError }
      }
    },
    {}
  )

  return (
    <main className={styles.main}>
      <div className={styles.logoWrapper}>
        <Image
          src="/assets/logo.svg"
          className={styles.logo}
          alt=""
          fill
          aria-hidden="true"
        />
      </div>

      <Card className={styles.card}>
        <Typography as="h1" variant="h1" className={styles.title}>
          {t.title}
        </Typography>

        <form className={styles.form} action={formAction}>
          <AuthInput
            name="email"
            type="email"
            required
            placeholder={t.emailAddress}
            aria-label={t.emailAddress}
            autoFocus
            error={formState?.validationErrors?.email}
          />
          <AuthInput
            name="name"
            type="text"
            required
            placeholder={t.name}
            aria-label={t.name}
            error={formState?.validationErrors?.name}
          />
          <AuthInput
            name="password"
            type="password"
            required
            minLength={passwordMinLength}
            placeholder={t.password}
            aria-label={t.password}
            error={formState?.validationErrors?.password}
          />
          <AuthInput
            name="confirmPassword"
            type="password"
            required
            placeholder={t.repeatPassword}
            aria-label={t.repeatPassword}
            error={formState?.validationErrors?.confirmPassword}
          />

          {formState?.error && <FormError>{formState.error}</FormError>}

          <SubmitButton>{t.createAccount}</SubmitButton>

          <Typography as="p" variant="body1" className={styles.bottomMsg}>
            {t.alreadyHaveAccount} <Link href="/auth/signin">{t.signIn}</Link>
          </Typography>
        </form>
      </Card>
    </main>
  )
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className={styles.submitBtn} loading={pending}>
      {children}
    </Button>
  )
}

function FormError({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  if (pending) {
    return null
  }

  return (
    <Typography as="p" variant="body1" className={styles.errorMessage}>
      {children}
    </Typography>
  )
}
