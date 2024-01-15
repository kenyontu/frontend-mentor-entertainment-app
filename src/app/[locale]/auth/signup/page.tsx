'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import styles from '~/styles/Auth.module.scss'
import { AuthInput } from '~/components/auth/AuthInput'
import { Button } from '~/components/Button'
import { Card } from '~/components/Card'
import { Typography } from '~/components/Typography'
import { createUser } from '~/actions/users'
import { userSchema } from '~/lib/schemas/user'
import { Link, useRouter } from '~/navigation'

const formSchema = userSchema
  .merge(z.object({ confirmPassword: z.string() }))
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type Inputs = z.infer<typeof formSchema>

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(formSchema) })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true)

    try {
      const user = await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (!user) {
        throw new Error(`User creation didn't return the user`)
      }

      // Since there's no email confirmation, automatically sign in the newly
      // created user
      signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((res) => {
        if (!res || !res.ok) {
          // TODO: Report error
          setFormError(
            res?.error ??
              'There was an error while signing in, please try again later'
          )
        }

        router.push('/')
      })
    } catch (error) {
      // TODO: Report error
      setIsLoading(false)
      setFormError(
        'There was an error while signing up, please try again later'
      )
    }
  }

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
            Sign Up
          </Typography>

          <form
            method="post"
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <AuthInput
              placeholder="Email address"
              aria-label="Email address"
              autoFocus
              error={errors.email?.message}
              {...register('email', { required: true })}
            />
            <AuthInput
              type="text"
              placeholder="Name"
              aria-label="Name"
              error={errors.name?.message}
              {...register('name', { required: true })}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              aria-label="Password"
              error={errors.password?.message}
              {...register('password', { required: true })}
            />
            <AuthInput
              type="password"
              placeholder="Repeat password"
              aria-label="Repeat password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', { required: true })}
            />

            {formError && (
              <Typography
                as="p"
                variant="body1"
                className={styles.errorMessage}
              >
                {formError}
              </Typography>
            )}

            <Button
              type="submit"
              className={styles.submitBtn}
              loading={isLoading}
            >
              Create an account
            </Button>

            <Typography as="p" variant="body1" className={styles.bottomMsg}>
              Already have an account? <Link href="/auth/signin">Sign In</Link>
            </Typography>
          </form>
        </Card>
      </main>
    </>
  )
}
