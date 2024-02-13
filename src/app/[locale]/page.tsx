import { unstable_setRequestLocale } from 'next-intl/server'
import { RedirectType } from 'next/navigation'
import { LocaleParam, redirect } from '~/navigation'

type Props = {
  params: LocaleParam
}

export default function IndexPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)
  // next-intl does not seem to support redirects in the `next.config.js` file
  // so we redirect here
  redirect('/shows', RedirectType.replace)
}
