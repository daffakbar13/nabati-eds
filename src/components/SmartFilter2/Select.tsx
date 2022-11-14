import React from 'react'
import { Select } from 'antd'

export const { Option } = Select
export default function StyledSelect(props) {
    return (
        <Select style={{
            border: '1px solid #AAAAAA',
            borderRadius: 8,
            height: 48,
            display: 'flex',
            alignItems: 'center',
        }} {...props} />
    )
}
