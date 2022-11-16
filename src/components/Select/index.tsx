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
                // eslint-disable-next-line max-len
                ...props.style, // !DON'T DELETE THIS. Because there is style injection in SmartFilter by React.clone method. It would cause styling error at SmartFilter
            }} />
    )
}
