import React from 'react'
import { Button, Col, Row, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
// import { TableSalesOrder } from 'src/data/tables'
import { Pagination, Checkbox, Popover, Divider } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import { getSalesOrder } from 'src/api/sales-order'
import { PageSalesOrderProps } from './types'
import { TableSalesOrder } from './columns'

function showTotal(total: number, range: number[]) {
    const ranges = range.join('-')
    const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
    return <p>{text}</p>
}

export default function PageSalesOrder(props: PageSalesOrderProps) {
    const table = useTable({
        api: '',
        funcApi: getSalesOrder,
        haveCheckbox: { headCell: 'status_name', member: ['New'] },
        columns: TableSalesOrder,
    })
    const titlePage = useTitlePage('list')

    const content = (
        <>
            {TableSalesOrder.map(({ title }, index) => (
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

    const hasNoData = table.data.length === 0

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
                <div style={{ overflow: 'scroll' }}>
                    <Table
                        loading={table.loading}
                        columns={[...table.columns, { title: <HideShowColumns /> }]}
                        dataSource={table.data}
                        showSorterTooltip={false}
                        rowSelection={table.rowSelection}
                        rowKey={'id'}
                        pagination={false}
                        onChange={(_, __, sorter) => console.log(sorter)}
                    />
                    {!hasNoData &&
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
                    }
                </div>
            </Card>
        </Col>
    )
}
