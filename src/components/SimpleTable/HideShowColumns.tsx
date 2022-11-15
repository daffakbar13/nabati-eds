import React from 'react'
import { Checkbox, Popover, Divider } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

const HideShowColumns = ({ initialColumns, toggleTable, resetColumns }) => {
    const content = (
        <div style={{ fontWeight: 'bold' }}>
            <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Hide/Show Columns
            </h4>
            {initialColumns.map(({ title, active }, ind: number) => (
                <div key={ind} style={{ display: 'flex', gap: 10 }}>
                    <Checkbox
                        checked={active}
                        onChange={(e) => toggleTable(ind, e.target.checked)}
                    />
                    <p
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => toggleTable(ind, !active)}>{title}</p>
                </div>
            ))}
            <Divider style={{ margin: '10px 0' }} />
            <h4
                onClick={resetColumns}
                style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    cursor: 'pointer',
                    color: '#EB008B',
                }}

            >
                Reset
            </h4>
        </div>
    )
    return (
        <Popover placement="bottomRight" content={content} trigger="click">
            <div style={{ width: 30, marginLeft: 'auto', cursor: 'pointer' }}>
                <MoreOutlined />
            </div>
        </Popover>
    )
}

export default HideShowColumns
