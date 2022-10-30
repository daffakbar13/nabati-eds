import { Col, Row, Divider } from 'antd'
import { Table, Spacer } from 'pink-lava-ui'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import useTable from 'src/hooks/useTable'

import { TableSalesOrder } from '../columns'

interface SalesOrderProps {
    data: any
}

const createDataList = (label: string, value: string) => ({ label, value })

export default function SalesOrder(props: SalesOrderProps) {
    const { data } = props
    // const table = useTable({ api: '', columns: TableSalesOrder })
    const dataList = [
        createDataList('Sales Order', data.id),
        createDataList('Customer', data.customer_id),
        createDataList('Sales Org.', data.sales_org_id),
        // FIXME Plant
        createDataList('Plant', data.plant),
        createDataList('Salesman', data.salesman_id),
        // FIXME Doc. Date
        createDataList('Doc. Date', data.doc_date),
        createDataList('Delivery Date', data.delivery_date),
        // FIXME Quotation
        createDataList('Quotation', data.quotation),
        createDataList('Reference', data.customer_ref),
        createDataList('Created On', data.created_at),
        createDataList('Created By', data.created_by),
        createDataList('Modified On', data.modified_at),
        createDataList('Modified By', data.modified_by),
    ]

    if (data.items) {
        data.items.forEach((obj, index) => {
            Object.assign(obj, { no: index + 1, sub_total: obj.order_qty * obj.price })
        })
    }

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
                <Table columns={TableSalesOrder} dataSource={data.items} />
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
