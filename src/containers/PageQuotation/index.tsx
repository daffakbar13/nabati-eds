import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
import { Pagination, Checkbox, Popover, Divider, Typography } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import FloatAction from 'src/components/FloatAction'
import { getQuotation } from 'src/api/quotation'
import Popup from 'src/components/Popup'

import { PageQuotationProps } from './types'
import { TableQuotation } from './columns'

function showTotal(total: number, range: number[]) {
    const ranges = range.join('-')
    console.log(total, range)

    const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
    return <p>{text}</p>
}

export default function PageQuotation(props: PageQuotationProps) {
    const [data, setData] = useState(null)
    const table = useTable({
        api: 'https://dist-system.nabatisnack.co.id:3001/v1/quotations/list',
        bodyApi: {
            filters: [],
            limit: 5,
            page: 1,
        },
        funcApi: getQuotation,
        haveCheckbox: { headCell: 'status_name', member: ['New'] },
        columns: TableQuotation,
    })
    const titlePage = useTitlePage('list')
    const [showConfirm, setShowConfirm] = React.useState('')

    const content = (
        <>
            {TableQuotation.map(({ title }, index) => (
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

            const res = await getQuotation()
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
            <Card>
                <Row justifyContent="space-between">
                    <Search
                        width="380px"
                        nameIcon="SearchOutlined"
                        placeholder="Search Menu Design Name"
                        colorIcon={colors.grey.regular}
                        onChange={() => { }}
                    />
                    <Row gap="16px">
                        <Button size="big" variant="secondary" onClick={() => { }}>
                            Download
                        </Button>
                        <Button size="big" variant="primary" onClick={() => { }}>
                            Create
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
        </Col>
    )
}
