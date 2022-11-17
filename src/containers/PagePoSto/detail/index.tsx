import React from 'react'
import { Spacer, Text, Table, Row } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Col, Divider } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getPoStoDetail } from 'src/api/logistic/po-sto'
import dateFormat from 'src/utils/dateFormat'
import DataList from 'src/components/DataList'
import { columns } from './column'

export default function PagePoSToDetail() {
    const titlePage = useTitlePage('detail')
    const router = useRouter()
    const data: any = useDetail(getPoStoDetail, { id: router.query.id as string })
    const createDataList = (label: string, value: string) => ({ label, value })
    const format = 'DD MMMM YYYY'

    const dataList = [
        //row 1
        createDataList('Receiving Branch', `${data.receive_plant_id || ''} - ${data.receive_plant_name || ''}`),
        createDataList('Supplying Branch', `${data.suppl_branch_id || ''} - ${data.suppl_branch_name || ''}`),

        //row 2
        createDataList('Doc Date', dateFormat(data.document_date, format)),
        createDataList('Posting Date', dateFormat(data.posting_date, format)),
        createDataList('Remarks', ((data.remarks != '' && data.remarks != null) ? data.remarks : '-')),

        // row 3
        createDataList('Created On', ((data.created_at != '' && data.created_at != null) ? dateFormat(data.created_at, format) : '-')),
        createDataList('Created By', ((data.created_by != '' && data.created_by != null) ? data.created_by : '-')),
        createDataList('Modified On', ((data.modified_at != '' && data.modified_at != null) ? dateFormat(data.modified_at, format) : '-')),
        createDataList('Modified By', ((data.modified_by != '' && data.modified_by != null) ? dateFormat(data.modified_by, format) : '-')),
    ]

    return (
        <Col>
            <div style={{ display: 'flex', gap: 5 }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        router.push('/logistic/po-sto')
                    }}
                >
                    <ArrowLeftOutlined style={{ fontSize: 25 }} />
                </div>
                <Text variant={'h4'}>View PO STO - {router.query.id}</Text>
            </div>
            <Spacer size={20} />
            <Card style={{ padding: '16px 20px' }}>
                <Row gutter={8}>
                    <Col span={8}>
                        {dataList.slice(0, 2).map(({ label, value }, i) => (
                            <DataList key={i} label={label} value={value} />
                        ))}
                    </Col>
                    <Col span={8}>
                        {dataList.slice(2, 5).map(({ label, value }, i) => (
                            <DataList key={i} label={label} value={value} />
                        ))}
                    </Col>
                    <Col span={8}>
                        {dataList.slice(5).map(({ label, value }, i) => (
                            <DataList key={i} label={label} value={value} />
                        ))}
                    </Col>
                </Row>
                <Divider />
                <div style={{ overflow: 'scroll' }}>
                    <Table columns={columns} data={data.items} />
                </div>
            </Card>
        </Col>
    )
}