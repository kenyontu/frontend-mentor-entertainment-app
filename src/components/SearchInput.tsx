import Image from 'next/image'
import { ComponentProps, useEffect, useState } from 'react'
import { TextInput } from './TextInput'

import clsx from 'clsx'
import { useRouter } from 'next/router'
import { getSingleQueryValue } from '~/lib/utils'
import styles from './SearchInput.module.scss'
import { Typography } from './Typography'

type Props = {
  className?: string
  inputProps?: ComponentProps<'input'>
}

export function SearchInput({
  className,
  inputProps = {},
}: Props) {
  const search = useSearch()

  return (
    <div className={clsx(styles.container, className)}>
      <Image src='/assets/icon-search.svg' alt='' width={24} height={24} />
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
      {search.queryValue
        && (
          <Typography
            as='button'
            variant='body1'
            onClick={search.clear}
            className={styles.clearBtn}
          >
            Clear
          </Typography>
        )}
    </div>
  )
}

export function useSearch(paramName: string = 's') {
  const router = useRouter()
  const [value, setValue] = useState('')

  const queryValue = getSingleQueryValue(router.query[paramName]) ?? ''

  useEffect(() => {
    setValue(queryValue)
  }, [queryValue])

  const setQueryParam = (value: string) => {
    const query = { ...router.query }

    if (value) {
      query[paramName] = value
    } else {
      delete query[paramName]
    }

    router.push(
      { query },
      undefined,
      { shallow: true },
    )
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
