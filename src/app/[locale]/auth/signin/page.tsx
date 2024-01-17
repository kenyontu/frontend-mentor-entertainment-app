import { SignInForm } from './SignInForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '~/app/api/auth/[...nextauth]/route'
import { LocaleParam, redirect } from '~/navigation'
import { RedirectType } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

export default async function SignInPage() {
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

type Props = {
  params: LocaleParam
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('signInTitle'),
  }
}
