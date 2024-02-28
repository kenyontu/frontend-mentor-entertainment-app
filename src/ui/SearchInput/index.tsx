'use client'

import { ComponentProps, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import clsx from 'clsx'

import styles from './styles.module.scss'
import { Typography } from '../Typography'
import { TextInput } from '../TextInput'

type Props = {
  searchParamName: string
  className?: string
  inputProps?: ComponentProps<'input'>
}

export function SearchInput({
  searchParamName,
  className,
  inputProps = {},
}: Props) {
  const search = useSearch(searchParamName)

  return (
    <div className={clsx(styles.container, className)}>
      <Image
        src="/assets/icon-search.svg"
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
      />
      <TextInput
        className={clsx(styles.input)}
        inputProps={{
          ...inputProps,
          type: 'text',
          value: search.value,
          onChange: (event) => search.setValue(event.target.value),
          onKeyDown: (event) => {
            if (event.key === 'Enter') {
              search.updateQueryParam()
            }
          },
        }}
      />
      {search.queryValue && (
        <Typography
          as="button"
          variant="body1"
          onClick={search.clear}
          className={styles.clearBtn}
        >
          Clear
        </Typography>
      )}
    </div>
  )
}

export function useSearch(paramName: string) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryValue = searchParams.get(paramName) || ''
  const [value, setValue] = useState(queryValue)

  const setQueryParam = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(paramName, value)
    } else {
      params.delete(paramName)
    }

    router.push(pathname + '?' + params.toString())
  }

  const clear = () => {
    setValue('')
    setQueryParam('')
  }

  const updateQueryParam = () => setQueryParam(value)

  return {
    value,
    setValue,
    queryValue,
    updateQueryParam,
    clear,
  }
}
