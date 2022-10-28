import { Col, Row, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import { Spacer, Table } from 'pink-lava-ui'
import useDetail from 'src/hooks/useDetail'
import { TableQuotation } from '../columns'

interface QuotationProps {
    data: any
}

const createDataList = (label: string, value: string) => ({ label, value })

export default function Quotation(props: QuotationProps) {
    const { data } = props

    const dataList = [
        createDataList('Quotation', data.id),
        createDataList('Customer', data.customer_name),
        createDataList('Sales Org.', data.sales_org_id),
        createDataList('Plant', data.branch_id),
        createDataList('Salesman', data.salesman_id),
        // FIXME Doc. Date
        createDataList('Doc. Date', data.doc_date),
        createDataList('Valid From', data.valid_from),
        createDataList('Valid To', data.valid_to),
        createDataList('Delivery Date', data.delivery_date),
        createDataList('Reference', data.customer_ref),
        createDataList('Created On', data.created_at),
        createDataList('Created By', data.created_by),
        createDataList('Modified On', data.modified_at),
        createDataList('Modified By', data.modified_by),
        // FIXME Created From
        createDataList('Created From', data.created_from),
    ]

    if (data.items) {
        data.items.forEach((obj, index) => {
            Object.assign(obj, { no: index + 1, sub_total: obj.order_qty * obj.price })
        })
    }
    // if (data.items) {
    //     data.items.map((obj, index) => ({
    //         ...obj,
    //         no: index + 1,
    //         sub_total: obj.order_qty * obj.price,
    //     }))
    //     data.items.map((obj) => {
    //         setTotal(obj.order_qty * obj.price)
    //     })
    // }

    return (
        <>
            <Row gutter={8}>
                <Col span={8}>
                    {dataList.slice(0, 5).map(({ label, value }, i) => (
                        <DataList key={i} label={label} value={value} />
                    ))}
                </Col>
                <Col span={8}>
                    {dataList.slice(5, 10).map(({ label, value }, i) => (
                        <DataList key={i} label={label} value={value} />
                    ))}
                </Col>
                <Col span={8}>
                    {dataList.slice(10).map(({ label, value }, i) => (
                        <DataList key={i} label={label} value={value} />
                    ))}
                </Col>
            </Row>
            <Divider />
            <div style={{ overflow: 'scroll' }}>
                <Table columns={TableQuotation} data={data.items} />
            </div>
            <Spacer size={30} />
            <Row>
                <Col span={12} offset={12}>
                    <Total label="Total Amount" value={data.total_amount} />
                </Col>
            </Row>
        </>
    )
}
