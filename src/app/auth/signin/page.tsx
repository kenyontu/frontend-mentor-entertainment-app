'use client'

import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signInWithCredentials } from '~/actions/auth'
import { AuthInput } from '~/components/auth/AuthInput'
import { Button } from '~/components/Button'

import { Card } from '~/components/Card'
import { Typography } from '~/components/Typography'
import styles from '~/styles/Auth.module.scss'

type Input = {
  email: string
  password: string
}

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Input>()
  const router = useRouter()
  const session = useSession()

  if (session.status === 'authenticated') {
    router.replace('/')
  }

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
        setAuthError('Invalid email or password')
      }
    } catch (error) {
      // TODO: Report error
      console.error(error)
      throw new Error('Error while making the sign in request')
    }
  }

  return (
    <div>
      <Head>
        <title>Sign In</title>
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
            Sign In
          </Typography>

          <form
            method="post"
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <AuthInput
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              autoFocus
              {...register('email', { required: true })}
              aria-invalid={errors.email ? 'true' : 'false'}
              error={errors.email?.message}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              aria-label="Password"
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
              Login to your account
            </Button>

            <Typography as="p" variant="body1" className={styles.bottomMsg}>
              {"Don't have an account? "}
              <Link href="/auth/signup">Sign Up</Link>
            </Typography>
          </form>
        </Card>
      </main>
    </div>
  )
}
