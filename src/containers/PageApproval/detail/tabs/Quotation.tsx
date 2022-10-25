import { Col, Row, Table, Divider } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import Total from 'src/components/Total'
import useTable from 'src/hooks/useTable'
import { Spacer } from 'pink-lava-ui';
import { TableQuotation } from '../columns'

interface QuotationProps {

}

const createDataList = (label: string, value: string) => ({ label, value })

export default function Quotation(props: QuotationProps) {
    const { } = props
    const table = useTable({ api: '', columns: TableQuotation })
    const dataList = [
        createDataList('Quotation', 'ZOP1'),
        createDataList('Customer', 'ZOP1'),
        createDataList('Sales Org.', 'ZOP1'),
        createDataList('Plant', 'ZOP1'),
        createDataList('Salesman', 'ZOP1'),
        createDataList('Doc. Date', 'ZOP1'),
        createDataList('Valid From', 'ZOP1'),
        createDataList('Valid To', 'ZOP1'),
        createDataList('Delivery Date', 'ZOP1'),
        createDataList('Reference', 'ZOP1'),
        createDataList('Created On', 'ZOP1'),
        createDataList('Created By', 'ZOP1'),
        createDataList('Modified On', 'ZOP1'),
        createDataList('Modified By', 'ZOP1'),
        createDataList('Created From', 'ZOP1'),
    ]

    return (
        <>
            <Row gutter={8}>
                <Col span={8} >
                    {dataList.slice(0, 5).map(({ label, value }, i) => (
                        <DataList key={i} label={label} value={value} />
                    ))}
                </Col>
                <Col span={8} >
                    {dataList.slice(5, 10).map(({ label, value }, i) => (
                        <DataList key={i} label={label} value={value} />
                    ))}
                </Col>
                <Col span={8} >
                    {dataList.slice(10).map(({ label, value }, i) => (
                        <DataList key={i} label={label} value={value} />
                    ))}
                </Col>
            </Row>
            <Divider />
            <div style={{ overflow: 'scroll' }} >
                <Table columns={table.columns} dataSource={[]} />
            </div>
            <Spacer size={30} />
            <Row>
                <Col span={12} offset={12}>
                    <Total label='Total Amount' value={123} />
                </Col>
            </Row>

        </>
    )
}
