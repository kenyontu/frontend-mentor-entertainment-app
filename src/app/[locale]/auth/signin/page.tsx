import { SignInForm } from './SignInForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '~/app/api/auth/[...nextauth]/options'
import { LocaleParam, redirect } from '~/navigation'
import { RedirectType } from 'next/navigation'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'

type Props = {
  params: LocaleParam
}

export default async function SignInPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations('SignIn')
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/shows', RedirectType.replace)
  }

  return (
    <SignInForm
      t={{
        title: t('title'),
        invalidEmailPassword: t('invalidEmailPassword'),
        requestError: t('requestError'),
        emailAddress: t('emailAddress'),
        password: t('password'),
        login: t('login'),
        dontHaveAccount: t('dontHaveAccount'),
        signUp: t('signUp'),
      }}
    />
  )
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('signInTitle'),
  }
}
