'use client'

import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthInput } from '~/components/auth/AuthInput'
import { Button } from '~/components/Button'

import styles from '~/styles/Auth.module.scss'
import { Card } from '~/components/Card'
import { Typography } from '~/components/Typography'
import { Link } from '~/navigation'

type Input = {
  email: string
  password: string
}

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = async ({ email, password }) => {
    setAuthError(null)
    setIsLoading(true)

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (!res || !res.ok) {
        setIsLoading(false)
        setFocus('email')
        reset()
        setAuthError(t.invalidEmailPassword)
      }
    } catch (error) {
      // TODO: Report error
      console.error(error)
      throw new Error(t.requestError)
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

          <form
            method="post"
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <AuthInput
              type="email"
              placeholder={t.emailAddress}
              aria-label={t.emailAddress}
              autoFocus
              {...register('email', { required: true })}
              aria-invalid={errors.email ? 'true' : 'false'}
              error={errors.email?.message}
            />
            <AuthInput
              type="password"
              placeholder={t.password}
              aria-label={t.password}
              {...register('password', { required: true })}
              aria-invalid={errors.password ? 'true' : 'false'}
              error={errors.password?.message}
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

            <Button
              type="submit"
              className={styles.submitBtn}
              loading={isLoading}
            >
              {t.login}
            </Button>

            <Typography as="p" variant="body1" className={styles.bottomMsg}>
              {t.dontHaveAccount} <Link href="/auth/signup">{t.signUp}</Link>
            </Typography>
          </form>
        </Card>
      </main>
    </div>
  )
}
