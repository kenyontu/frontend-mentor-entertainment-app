import { zodResolver } from '@hookform/resolvers/zod'
import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { AuthInput } from '~/components/auth/AuthInput'
import { Button } from '~/components/Button'
import { Card } from '~/components/Card'
import { Typography } from '~/components/Typography'
import { postUser, userSchema } from '~/lib/api/users'
import styles from '~/styles/Auth.module.scss'

const formSchema = userSchema.merge(z.object({ confirmPassword: z.string() }))
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type Inputs = z.infer<typeof formSchema>

const SignUpPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, setError } = useForm<
    Inputs
  >({ resolver: zodResolver(formSchema) })

  const onSubmit: SubmitHandler<Inputs> = (
    data,
  ) => {
    setIsLoading(true)

    postUser(data).then((res) => {
      if (res.success) {
        // Since there's no email confirmation, automatically sign in the newly
        // created user
        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((res) => {
          if (!res || !res.ok) {
            return setFormError(
              res?.error ?? 'Error while making the sign in request',
            )
          }

          router.push('/')
        })

        return
      }

      setIsLoading(false)

      if (res.message) {
        return setFormError(res.message)
      }

      if (res.form?.formErrors?.[0]) {
        return setFormError(res.form.formErrors[0])
      }

      const fields = res.form?.fieldErrors ?? null

      if (fields) {
        ;(Object.keys(fields) as Array<keyof typeof fields>).forEach(
          (key, index) => {
            const fieldMessages = fields[key]
            if (Array.isArray(fieldMessages) && fieldMessages.length > 0) {
              setError(key, { message: fieldMessages[0] }, {
                shouldFocus: index === 0,
              })
            }
          },
        )
      }
    })
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.logoWrapper}>
          <Image
            src='/assets/logo.svg'
            className={styles.logo}
            alt=''
            fill
            aria-hidden
          />
        </div>

        <Card className={styles.card}>
          <Typography as='h1' variant='h1' className={styles.title}>
            Sign Up
          </Typography>

          <form
            method='post'
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <AuthInput
              placeholder='Email address'
              aria-label='Email address'
              autoFocus
              error={errors.email?.message}
              {...register('email', { required: true })}
            />
            <AuthInput
              type='text'
              placeholder='Name'
              aria-label='Name'
              error={errors.name?.message}
              {...register('name', { required: true })}
            />
            <AuthInput
              type='password'
              placeholder='Password'
              aria-label='Password'
              error={errors.password?.message}
              {...register('password', { required: true })}
            />
            <AuthInput
              type='password'
              placeholder='Repeat password'
              aria-label='Repeat password'
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', { required: true })}
            />

            {formError
              && (
                <Typography
                  as='p'
                  variant='body1'
                  className={styles.errorMessage}
                >
                  {formError}
                </Typography>
              )}

            <Button
              type='submit'
              className={styles.submitBtn}
              loading={isLoading}
            >
              Create an account
            </Button>

            <Typography as='p' variant='body1' className={styles.bottomMsg}>
              Already have an account? <Link href='/auth/signin'>Sign In</Link>
            </Typography>
          </form>
        </Card>
      </main>
    </>
  )
}

export default SignUpPage
