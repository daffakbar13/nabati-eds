import React, { useMemo, useRef, useState } from 'react'
import { Text, Spin } from 'pink-lava-ui'
import { debounce } from 'lodash'
import { Select } from 'antd'

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
    ...props
}: DebounceSelectProps<ValueType>) {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState<ValueType[]>([])
    const fetchRef = useRef(0)

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
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

        return debounce(loadOptions, debounceTimeout)
    }, [fetchOptions, debounceTimeout])

    return (
        <div>
            {label && (
                <Text
                    variant="headingSmall"
                    textAlign="center"
                    style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
                >
                    {label}
                </Text>
            )}
            <Select
                showSearch
                labelInValue
                filterOption={false}
                onSearch={debounceFetcher}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                placeholder="Type To Search"
                {...props}
                options={options}
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
        </div>
    )
}

export default DebounceSelect