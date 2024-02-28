'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

import styles from '~/styles/Auth.module.scss'
import { Link } from '~/navigation'
import { Card } from '~/ui/Card'
import { Typography } from '~/ui/Typography'
import { AuthInput } from '~/ui/AuthInput'
import { Button } from '~/ui/Button'

type Props = {
  t: {
    title: string
    invalidEmailPassword: string
    requestError: string
    emailAddress: string
    password: string
    login: string
    dontHaveAccount: string
    signUp: string
  }
}

export function SignInForm({ t }: Props) {
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()

  const formAction = async (formData: FormData) => {
    setAuthError(null)

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (res?.ok) {
      router.replace('/')
    } else if (res?.status === 401) {
      setAuthError(t.invalidEmailPassword)
    } else {
      setAuthError(t.requestError)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.logoWrapper}>
        <Image
          src="/assets/logo.svg"
          className={styles.logo}
          alt=""
          fill
          aria-hidden
        />
      </div>

      <Card className={styles.card}>
        <Typography as="h1" variant="h1" className={styles.title}>
          {t.title}
        </Typography>

        <form action={formAction} className={styles.form}>
          <AuthInput
            name="email"
            type="email"
            placeholder={t.emailAddress}
            aria-label={t.emailAddress}
            autoFocus
            required
          />
          <AuthInput
            name="password"
            type="password"
            placeholder={t.password}
            aria-label={t.password}
            required
          />

          {authError && (
            <Typography as="p" variant="body1" className={styles.errorMessage}>
              {authError}
            </Typography>
          )}

          <SubmitButton>{t.login}</SubmitButton>

          <Typography as="p" variant="body1" className={styles.bottomMsg}>
            {t.dontHaveAccount} <Link href="/auth/signup">{t.signUp}</Link>
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
