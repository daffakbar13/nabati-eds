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

  return (
    <>
      <>
        <Row>
          <TitleDataList title={'Picture'} />
        </Row>
        <Row>
          <Col span={12}>
            <img
              src={customer?.picture}
              alt=""
              style={{
                marginTop: 10,
                maxHeight: 500,
              }}
            />
          </Col>
        </Row>
        <Divider />
      </>
    </>
  )
}
