/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable camelcase */
import { Col, Divider, Row } from 'antd'
import React from 'react'
import DataList from 'src/components/DataList'
import TitleDataList from 'src/components/TitleDataList'
import { Table } from 'pink-lava-ui'
import { AllDataCustomer, TableInformation } from './types'

const LimitData = {
  'Customer Information': 3,
  'Customer Group Information': 4,
  'Company Information': 4,
  'Payment Information': 9,
}

interface TabCustomerInfoProps {
  data: AllDataCustomer
  table: TableInformation
}

export default function TabCustomerInfo(props: TabCustomerInfoProps) {
  const { data, table } = props

  const dataList = Object.keys(data).map((title) => ({
    title,
    content: Object.keys(data[title]).map((value) =>
      DataList.createDataList(value, data[title][value]),
    ),
    limit: LimitData[title],
  }))

  return (
    <>
      {dataList.map(({ content, limit, title }) => (
        <>
          <Row>
            <TitleDataList title={title} />
          </Row>
          <Row>
            <Col span={12}>
              {content.slice(0, limit).map(({ label, value }, index) => (
                <DataList key={index} label={label} value={value} />
              ))}
            </Col>
            <Col span={12}>
              {content.slice(limit).map(({ label, value }, index) => (
                <DataList key={index} label={label} value={value} />
              ))}
            </Col>
          </Row>
          <Divider />
        </>
      ))}
      <Table
        dataSource={[table]}
        columns={Object.keys(table).map((title) => ({ title, dataIndex: title }))}
      />
    </>
  )
}
