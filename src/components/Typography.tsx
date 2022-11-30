import clsx from 'clsx'
import { createElement, forwardRef } from 'react'
import type { ElementRef, ForwardedRef } from 'react'
import type { ComponentProps } from 'react'

import styles from './Typography.module.scss'

const classByVariant = {
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  body1: styles.body1,
  body2: styles.body2,
}

type Variants = keyof typeof classByVariant

type AsElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'a'
  | 'span'
  | 'label'
  | 'button'

type Props<A extends AsElement> = {
  variant: Variants
  as: A
} & ComponentProps<A>

function TypographyImpl<T extends AsElement>(
  { variant, as, children, className, ...rest }: Props<T>,
  ref?: ForwardedRef<ElementRef<T>>,
) {
  return createElement(
    as,
    { ref, className: clsx(classByVariant[variant], className), ...rest },
    children,
  )
}

export const Typography = forwardRef(TypographyImpl)

Typography.displayName = 'Typography'
