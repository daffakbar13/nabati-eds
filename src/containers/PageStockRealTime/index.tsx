import React, { useEffect, useState } from 'react'
import { MoreOutlined } from '@ant-design/icons'
import axios from 'axios'
import { Pagination, Checkbox, Popover, Divider, Typography } from 'antd'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'

import { Card, FloatAction, Popup } from 'src/components'
import { useTable, useTitlePage } from 'src/hooks'

import { ICFilter } from 'src/assets/icons'
import { colors } from 'src/configs/colors'

import { getStockRealtimeList } from 'src/api/stock-real-time'
import { PageRealTimeProps } from './types'
import { StockRealTimeColumns } from './columns'

function showTotal(total: number, range: number[]) {
    const ranges = range.join('-')
    console.log(total, range)

    const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
    return <p>{text}</p>
}

export default function PageRealTime(props: PageRealTimeProps) {
    const [data, setData] = useState(null)
    const [showFilter, setShowFilter] = React.useState(false)

    const table = useTable({
        api: '',
        bodyApi: {
            filters: [
                {
                    field: 'product_id',
                    option: 'BT',
                    from_value: '300006',
                    to_value: '300007',
                    data_type: 'S',
                },
            ],
            limit: 8,
            page: 1,
        },
        funcApi: getStockRealtimeList,
        haveCheckbox: { headCell: 'status_name', member: ['New'] },
        columns: StockRealTimeColumns,
    })
    const titlePage = useTitlePage('list')
    const [showConfirm, setShowConfirm] = React.useState('')

    const content = (
        <>
            {StockRealTimeColumns.map(({ title }, index) => (
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

    useEffect(() => {
        const fetchData = async () => {
            // const res2 = await getCompany({ page: 1 })
            // console.log('company', res2)

            await fetch('https://dist-system.nabatisnack.co.id:3001/v1/quotations/list', { method: 'POST' })
                .then((res) => res.json())
                .then((dt) => console.log(dt))

            axios
                .post('https://dist-system.nabatisnack.co.id:3001/v1/quotations/list')
                // .then((res) => res.json())
                .then((dt) => console.log(dt))

            const res = await getStockRealtimeList()
            console.log('res', res)
            setData(res.data)
        }
        fetchData()
    }, [])

    console.log('data', data)

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
                        <Button
                            size="big"
                            variant="tertiary"
                            onClick={() => setShowFilter(true)}
                            style={{
                                border: '1px solid #888888',
                                color: '#888888',
                                justifyContent: 'flex-start',
                                gap: 16,
                            }}
                        >
                            <ICFilter /> Filter
                        </Button>
                    </Row>
                    <Row gap="16px">
                        <Button size="big" variant="secondary" onClick={() => { }}>
                            Download
                        </Button>
                    </Row>
                </Row>
            </Card>
            <Spacer size={10} />
            <Card style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', overflow: 'scroll' }}>
                    <Table
                        // sticky
                        // loading={table.loading}
                        columns={[...table.columns, { title: <HideShowColumns /> }]}
                        data={table.data}
                        showSorterTooltip={false}
                        rowSelection={table.rowSelection}
                        rowKey={'id'}
                    // pagination={false}
                    // onChange={(_, __, sorter) => console.log(sorter)}
                    // style={{ overflow: 'scroll' }}
                    />
                </div>
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

            {/* <HeadFIlterModal
                visible={showFilter}
                onOk={(res) => console.log('res', res)}
                onCancel={() => setShowFilter(false)}
                title="Filter"
            /> */}
        </Col>
    )
}
