import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { MoreOutlined } from '@ant-design/icons'
import { Pagination, Checkbox, Popover, Divider, Typography } from 'antd'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'

import { Card, FloatAction, Popup } from 'src/components'
import { useTable, useTitlePage } from 'src/hooks'
import { colors } from 'src/configs/colors'

import { getStockRealtimeList } from 'src/api/stock-real-time'

import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import { PageGoodReceiptProps } from './types'
import { columns } from './columns'

function showTotal(total: number, range: number[]) {
    const ranges = range.join('-')
    const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
    return <p>{text}</p>
}

export default function PageGoodReceipt(props: PageGoodReceiptProps) {
    const [filters, setFilters] = useSmartFilters([
        FILTER.SALES_ORG,
        FILTER.BRANCH,
        FILTER.SOLD_TO_CUSTOMER,
        FILTER.SHIP_TO_CUSTOMER,
        FILTER.ORDER_TYPE,
        FILTER.ORDER_DATE])

    const table = useTable({
        api: '',
        funcApi: getStockRealtimeList,
        haveCheckbox: { headCell: 'status_name', member: ['New'] },
        columns: columns,
    })
    const titlePage = useTitlePage('list')
    const [showConfirm, setShowConfirm] = React.useState('')
    const router = useRouter()

    const content = (
        <>
            {columns.map(({ title }, index) => (
                <div key={index}>
                    <Checkbox
                        defaultChecked={!table.hiddenColumns.includes(title)}
                        onChange={(event) => {
                            table.handleHideShowColumns(event.target, title)
                        }}
                    />{' '}
                    {title}
                </div>
            ))}
            <Divider />
            <h4
                onClick={table.handleResetHideShowColumns}
                style={{ textAlign: 'center', cursor: 'pointer' }}
            >
                Reset
            </h4>
        </>
    )

    const HideShowColumns = () => (
        <Popover placement="bottomRight" title={'Hide/Show Columns'} content={content} trigger="click">
            <span style={{ color: '#f0f0f0' }}>___</span>
            <MoreOutlined />
            <span style={{ color: '#f0f0f0' }}>___</span>
        </Popover>
    )

    console.log('router', router)

    return (
        <Col>
            <Text variant={'h4'}>{titlePage}</Text>
            <Spacer size={20} />
            <Card style={{ overflow: 'unset' }}>
                <Row justifyContent="space-between">
                    <Row gap="16px">
                        <Search
                            width="380px"
                            nameIcon="SearchOutlined"
                            placeholder="Search Menu Design Name"
                            colorIcon={colors.grey.regular}
                            onChange={() => { }}
                        />
                        <SmartFilter onOk={setFilters} filters={filters} />
                    </Row>
                    <Row gap="16px">
                        <Button size="big" variant="secondary" onClick={() => { }}>
                            Download
                        </Button>
                        <Button size="big" variant="primary" onClick={() => router.push(`${router.pathname}/create`)}>
                            Create
                        </Button>
                    </Row>
                </Row>
            </Card>
            <Spacer size={10} />
            <Card style={{ padding: '16px 20px' }}>
                <Table
                    loading={table.loading}
                    columns={[...table.columns, { title: <HideShowColumns />, width: 50 }]}
                    dataSource={table.data}
                    showSorterTooltip={false}
                    pagination={false}
                />
                <Pagination
                    defaultPageSize={20}
                    pageSizeOptions={[20, 50, 100]}
                    showLessItems
                    showSizeChanger
                    showQuickJumper
                    responsive
                    total={table.data.length}
                    showTotal={showTotal}
                />
                {table.selected.length > 0 && (
                    <FloatAction>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <b>{table.selected.length} Document Quotation are Selected</b>
                        </div>
                        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
                            <Button size="big" variant="tertiary" onClick={() => { }}>
                                Cancel
                            </Button>
                            <Button
                                size="big"
                                variant="primary"
                                onClick={() => {
                                    setShowConfirm('submit')
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </FloatAction>
                )}
                {showConfirm === 'submit' && (
                    <Popup>
                        <Typography.Title level={3} style={{ margin: 0 }}>
                            Confirm Submit
                        </Typography.Title>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                            Are you sure to submit quotation {table.selected.join(', ')} ?
                        </Typography.Title>
                        <div>
                            <Button size="big" variant="secondary" onClick={() => { }}>
                                Download
                            </Button>
                            <Button size="big" variant="primary" onClick={() => { }}>
                                Create
                            </Button>
                        </div>
                    </Popup>
                )}
            </Card>
        </Col>
    )
}
