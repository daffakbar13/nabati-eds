import React from 'react'
import { Table, Button, Col, Row, Search, Spacer, Text } from 'pink-lava-ui'
import { Pagination, Checkbox, Popover, Divider, Typography } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import useSimpleTable from './useSimpleTable';

const HideShowColumns = () => (
    <Popover placement="bottomRight" content={<></>} trigger="click">
        <MoreOutlined style={{ cursor: 'pointer' }} />
    </Popover>
)

export { useSimpleTable }
export default function SimpleTable({ table, initialColumns }) {
    return <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
        <Table
            loading={table.loading}
            // columns={[...table.columns]}
            columns={[...table.columns, { title: <HideShowColumns />, width: 50 }]}
            dataSource={table.data}
            showSorterTooltip={false}
            rowSelection={table.rowSelection}
            rowKey={'id'}
            pagination={table.pagination}

        />
    </div>
}
