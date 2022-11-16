import React from 'react'
import { Select } from 'antd'

export default function SelectStyled(props: any) {
    return (
        <Select {...props}
            labelInValue
            size="large"
            style={{
                display: 'grid',
                border: '1px solid #AAAAAA',
                borderRadius: 8,
                width: '100%',
                minHeight: 48,
                ...props.style,
            }} />
    )
}
