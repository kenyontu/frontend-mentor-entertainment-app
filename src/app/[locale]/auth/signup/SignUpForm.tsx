'use client'

import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'

import styles from '~/styles/Auth.module.scss'
import { AuthInput } from '~/components/auth/AuthInput'
import { Button } from '~/components/Button'
import { Card } from '~/components/Card'
import { Typography } from '~/components/Typography'
import { createUser } from '~/actions/users'
import { Link, useRouter } from '~/navigation'
import { useFormState, useFormStatus } from 'react-dom'

type Props = {
  passwordMinLength: number
  t: {
    title: string
    requestError: string
    emailAddress: string
    name: string
    password: string
    repeatPassword: string
    createAccount: string
    alreadyHaveAccount: string
    signIn: string
  }
}

type FormState =
  | {
      fieldErrors?: Awaited<ReturnType<typeof createUser>>['fieldErrors']
      formError?: string
    }
  | undefined

export function SignUpForm({ passwordMinLength, t }: Props) {
  const router = useRouter()
  const [formState, formAction] = useFormState<FormState, FormData>(
    async (prevState, formData) => {
      try {
        const createUserRes = await createUser(formData)

        if (createUserRes.ok === false) {
          return {
            fieldErrors: createUserRes.fieldErrors,
            formError: createUserRes.formError,
          }
        }

        const signInRes = await signIn('credentials', {
          email: formData.get('email'),
          password: formData.get('password'),
          redirect: false,
        })

        if (signInRes?.ok) {
          router.replace('/')
        } else {
          throw new Error(
            signInRes?.error ?? 'Error while signing in user after signing up'
          )
        }
      } catch (error) {
        // TODO: Report error
        return { formError: t.requestError }
      }
    },
    undefined
  )

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

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
              error={formState?.fieldErrors?.email}
            />
            <AuthInput
              name="name"
              type="text"
              required
              placeholder={t.name}
              aria-label={t.name}
              error={formState?.fieldErrors?.name}
            />
            <AuthInput
              name="password"
              type="password"
              required
              minLength={passwordMinLength}
              placeholder={t.password}
              aria-label={t.password}
              error={formState?.fieldErrors?.password}
            />
            <AuthInput
              name="confirmPassword"
              type="password"
              required
              placeholder={t.repeatPassword}
              aria-label={t.repeatPassword}
              error={formState?.fieldErrors?.confirmPassword}
            />

            {formState?.formError && (
              <FormError>{formState.formError}</FormError>
            )}

            <SubmitButton>{t.createAccount}</SubmitButton>

            <Typography as="p" variant="body1" className={styles.bottomMsg}>
              {t.alreadyHaveAccount} <Link href="/auth/signin">{t.signIn}</Link>
            </Typography>
          </form>
        </Card>
      </main>
    </>
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
