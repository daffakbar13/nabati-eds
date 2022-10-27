import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
import { Pagination, Dropdown, Space, Menu, Checkbox, Popover, Divider } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import FloatAction from 'src/components/FloatAction'
import { getQuotation } from 'src/api/quotation'
import { getCompany } from 'src/api/master-data'
import { PageQuotationProps } from './types'
import { TableQuotation } from './columns'

function showTotal(total: number, range: number[]) {
    const ranges = range.join('-')
    const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
    return <p>{text}</p>
}

export default function PageQuotation(props: PageQuotationProps) {
    const [data, setData] = useState(null)
    const table = useTable({
        api: '/dummy/list-quotation.json',
        haveCheckbox: { headCell: 'status_name', member: ['New'] },
        columns: TableQuotation,
    })
    const titlePage = useTitlePage('list')

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
        <Popover
            placement="bottomRight"
            title={'Hide/Show Columns'}
            content={content}
            trigger="click"
        >
            <MoreOutlined />
        </Popover>
    )

    useEffect(() => {
        const fetchData = async () => {
            // const res2 = await getCompany({ page: 1 })
            // console.log('company', res2)

            await fetch('https://dist-system.nabatisnack.co.id:3001/v1/quotations/list', {
                method: 'POST',
            })
                .then((res) => res.json())
                .then((data) => console.log(data))

            axios
                .post('https://dist-system.nabatisnack.co.id:3001/v1/quotations/list')
                // .then((res) => res.json())
                .then((data) => console.log(data))

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
                        onChange={() => {}}
                    />
                    <Row gap="16px">
                        <Button size="big" variant="secondary" onClick={() => {}}>
                            Download
                        </Button>
                        <Button size="big" variant="primary" onClick={() => {}}>
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
                        <div
                            style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}
                        >
                            <Button size="big" variant="tertiary" onClick={() => {}}>
                                Cancel
                            </Button>
                            <Button size="big" variant="primary" onClick={() => {}}>
                                Submit
                            </Button>
                        </div>
                    </FloatAction>
                )}
            </Card>
        </Col>
    )
}
