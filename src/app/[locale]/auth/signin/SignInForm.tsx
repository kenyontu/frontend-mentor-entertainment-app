'use client'

import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { AuthInput } from '~/components/auth/AuthInput'
import { Button } from '~/components/Button'

import styles from '~/styles/Auth.module.scss'
import { Card } from '~/components/Card'
import { Typography } from '~/components/Typography'
import { Link } from '~/navigation'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'

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
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()

  const formAction = async (formData: FormData) => {
    setAuthError(null)
    setIsLoading(true)

    try {
      const res = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      })

      if (res?.ok) {
        router.replace('/')
      } else {
        setIsLoading(false)
        setAuthError(t.invalidEmailPassword)
      }
    } catch (error) {
      // TODO: Report error
      setIsLoading(false)
      setAuthError(t.requestError)
    }
  }

  return (
    <div>
      <Head>
        <title>{t.title}</title>
      </Head>

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
              <Typography
                as="p"
                variant="body1"
                className={styles.errorMessage}
              >
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
    </div>
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
