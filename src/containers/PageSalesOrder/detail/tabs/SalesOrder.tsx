import { Col, Row, Divider } from 'antd'
import { Table, Spacer } from 'pink-lava-ui'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import useTable from 'src/hooks/useTable'

import { TableSalesOrder } from '../columns'

interface SalesOrderProps {}

const createDataList = (label: string, value: string) => ({ label, value })

export default function SalesOrder(props: SalesOrderProps) {
    const {} = props
    const table = useTable({ api: '', columns: TableSalesOrder })
    const dataList = [
        createDataList('Sales Order', 'ZOP1'),
        createDataList('Customer', 'ZOP1'),
        createDataList('Sales Org.', 'ZOP1'),
        createDataList('Plant', 'ZOP1'),
        createDataList('Salesman', 'ZOP1'),
        createDataList('Doc. Date', 'ZOP1'),
        createDataList('Delivery Date', 'ZOP1'),
        createDataList('Quotation', 'ZOP1'),
        createDataList('Reference', 'ZOP1'),
        createDataList('Created On', 'ZOP1'),
        createDataList('Created By', 'ZOP1'),
        createDataList('Modified On', 'ZOP1'),
        createDataList('Modified By', 'ZOP1'),
    ]

    return (
        <>
            <Row gutter={8}>
                <Col span={8}>
                    {dataList.slice(0, 5).map(({ label, value }, i) => (
                        <DataList key={i} label={label} value={value} />
                    ))}
                </Col>
                <Col span={8}>
                    {dataList.slice(5, 9).map(({ label, value }, i) => (
                        <DataList key={i} label={label} value={value} />
                    ))}
                </Col>
                <Col span={8}>
                    {dataList.slice(9).map(({ label, value }, i) => (
                        <DataList key={i} label={label} value={value} />
                    ))}
                </Col>
            </Row>
            <Divider />
            <div style={{ overflow: 'scroll' }}>
                <Table columns={table.columns} dataSource={[]} />
            </div>
            <Spacer size={30} />
            <Row>
                <Col span={12} offset={12}>
                    <Total label="Total Amount" value={123} />
                </Col>
            </Row>
        </>
    )
}
