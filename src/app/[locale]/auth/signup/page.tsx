import { useTranslations } from 'next-intl'
import { SignUpForm } from './SignUpForm'

export default function SignUpPage() {
  const t = useTranslations('SignUp')

  const passwordMinLength = 5

  return (
    <SignUpForm
      passwordMinLength={passwordMinLength}
      t={{
        title: t('title'),
        requestError: t('requestError'),
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
