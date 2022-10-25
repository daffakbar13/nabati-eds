import React from 'react'
import moment from 'moment'
import { Divider, Table } from 'antd'
import { Button, Col, Row, Search, Spacer, Text, DatePickerInput } from 'pink-lava-ui'
import { ICPlusWhite } from 'src/assets/icons'
import DebounceSelect from 'src/components/DebounceSelect'
import { Card, NoDataFallback } from 'src/components'
import useTitlePage from 'src/hooks/useTitlePage'
import { fakeApi } from 'src/api/fakeApi'
import { columns } from './columns'

export default function CreateBilling() {
    const titlePage = useTitlePage('create')

    return (
        <Col>
            <Text variant={'h4'}>{titlePage}</Text>
            <Spacer size={20} />
            <Card style={{ overflow: 'unset' }}>
                <Row justifyContent="space-between" reverse>
                    <Row gap="16px">
                        <Button size="big" variant="tertiary" onClick={() => {}}>
                            Cancel
                        </Button>
                        <Button size="big" variant="secondary" onClick={() => {}}>
                            Save As Draft
                        </Button>
                        <Button size="big" variant="primary" onClick={() => {}}>
                            Submit
                        </Button>
                    </Row>
                </Row>
            </Card>
            <Spacer size={10} />
            <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <DebounceSelect label="Order Type" fetchOptions={fakeApi} onChange={() => {}} />
                    <DatePickerInput
                        fullWidth
                        onChange={() => {}}
                        label="GI Date"
                        defaultValue={moment()}
                        format={'DD/MM/YYYY'}
                        required
                    />
                    <DebounceSelect label="Customer" fetchOptions={fakeApi} onChange={() => {}} />
                    <DatePickerInput
                        fullWidth
                        onChange={() => {}}
                        label="Document Date"
                        defaultValue={moment()}
                        format={'DD/MM/YYYY'}
                        required
                    />
                    <DebounceSelect
                        label="Sales Organization"
                        fetchOptions={fakeApi}
                        onChange={() => {}}
                    />
                    <DatePickerInput
                        fullWidth
                        onChange={() => {}}
                        label="Delivery Date"
                        defaultValue={moment()}
                        format={'DD/MM/YYYY'}
                        required
                    />
                    <DebounceSelect label="Branch" fetchOptions={fakeApi} onChange={() => {}} />
                    <DebounceSelect label="Reference" fetchOptions={fakeApi} onChange={() => {}} />
                </div>
                <Divider style={{ borderColor: '#AAAAAA' }} />
                <Button
                    size="big"
                    variant="primary"
                    onClick={() => {}}
                    style={{ margin: '32px 0 20px' }}
                >
                    <ICPlusWhite /> Add New
                </Button>
                <Table
                    columns={columns()}
                    dataSource={[]}
                    locale={{ emptyText: <NoDataFallback /> }}
                />
            </Card>
        </Col>
    )
}
