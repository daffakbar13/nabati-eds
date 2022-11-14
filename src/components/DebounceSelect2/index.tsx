import React, { useMemo, useRef, useState, forwardRef } from 'react'
import { debounce } from 'lodash'
import { Select } from 'antd'
import { Spin } from 'pink-lava-ui'
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
    style,
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
        <Select
            showSearch
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
            size="large"
            style={{
                display: 'grid',
                // alignItems: 'center',
                border: '1px solid #AAAAAA',
                borderRadius: 8,
                width: '100%',
                minHeight: 48,
                ...style,
            }}
        />
    )
}

export default DebounceSelect