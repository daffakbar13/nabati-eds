/* eslint-disable camelcase */
import React from 'react'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { Col, Divider, Row } from 'antd'
import TitleDataList from 'src/components/TitleDataList'
import DataList from 'src/components/DataList'

const LimitData = {
  Picture: 2,
}

export default function Picture() {
  const {
    state: { data },
  } = useSalesQuotationDetailContext()
  const { customer } = data

  const dataCustomer: any = {
    Picture: {
      Picture: customer?.gadget_note,
    },
  }

  const dataList = Object.keys(dataCustomer).map((title) => ({
    title,
    content: Object.keys(dataCustomer[title]).map((value) =>
      DataList.createDataList(value, dataCustomer[title][value]),
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
    </>
  )
}
