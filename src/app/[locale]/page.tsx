import { unstable_setRequestLocale } from 'next-intl/server'
import { LocaleParam, redirect } from '~/navigation'

type Props = {
  children: React.ReactNode
  params: LocaleParam
}

export default function IndexPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)
  // next-intl does not seem to support redirects in the `next.config.js` file
  // so we redirect here
  redirect('/shows')
}