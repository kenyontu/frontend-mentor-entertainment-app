import { useTranslations } from 'next-intl'
import { SignInForm } from './SignInForm'

export default function SignInPage() {
  const t = useTranslations('SignIn')

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
