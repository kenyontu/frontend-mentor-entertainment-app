import { useTranslations } from 'next-intl'
import { SignUpForm } from './SignUpForm'
import { LocaleParam } from '~/navigation'
import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: LocaleParam
}

export default function SignUpPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('SignUp')

  const passwordMinLength = 5

  return (
    <SignUpForm
      passwordMinLength={passwordMinLength}
      t={{
        title: t('title'),
        requestError: t('requestError'),
        autoSignInError: t('autoSignInEror'),
        emailAddress: t('emailAddress'),
        name: t('name'),
        password: t('password'),
        repeatPassword: t('repeatPassword'),
        createAccount: t('createAccount'),
        alreadyHaveAccount: t('alreadyHaveAccount'),
        signIn: t('signIn'),
      }}
    />
  )
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('signUpTitle'),
  }
}
