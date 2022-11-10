import React, { useMemo, useRef, useState } from 'react'
import { Text, Spin } from 'pink-lava-ui'
import { debounce } from 'lodash'
import { Input, Select } from 'antd'
import { DebounceSelectProps } from './types'

function DebounceSelect<
  ValueType extends {
    key?: string
    label: React.ReactNode
    value: string | number
  } = any,
>({
  fetchOptions,
  debounceTimeout = 800,
  style = {},
  label,
  required,
  type,
  options,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false)
  const [optionsFromFetch, setOptions] = useState<ValueType[]>(options)
  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      if (fetchOptions) {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)

        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return
          }
          setOptions(newOptions)
          setFetching(false)
        })
      }
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  const mainComponent = (
    <>
      {type === 'select'
        && <>
          {!options
            ? <Select
              showSearch
              aria-required={'true'}
              labelInValue
              filterOption={false}
              onSearch={debounceFetcher}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              placeholder="Type To Search"
              {...props}
            options={optionsFromFetch}
            size="large"
            style={{
              border: '1px solid #AAAAAA',
              borderRadius: 8,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              ...style,
            }}
          />
          : <Select
            aria-required={'true'}
            labelInValue
            options={options}
              {...props}
              size="large"
              style={{
                border: '1px solid #AAAAAA',
                borderRadius: 8,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                ...style,
              }}
            />
          }
        </>
      }
      {type === 'input'
        && <Input
        size="large"
        {...props as any}
        style={{
          border: '1px solid #AAAAAA',
          borderRadius: 8,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          ...style,
        }}
      />
      }
    </>
  )

  if (label) {
    return (
      <div>
        <Text
          variant="headingSmall"
          textAlign="center"
          style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
        >
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </Text>
        {mainComponent}
      </div>
    )
  }

  return mainComponent
}

export default DebounceSelect
