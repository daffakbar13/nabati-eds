/* eslint-disable camelcase */
import { Col, Row, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import dateFormat from 'src/utils/dateFormat'
import { ColumnsPromotionList } from '../columns'

interface PromotionListProps {
  data: any
}

function CustomText(props: React.CSSProperties & { children?: React.ReactNode } = {}) {
  return (
    <div
      style={{
        color: props?.color || '#565656',
        fontWeight: props?.fontWeight || 'normal',
        fontSize: props?.fontSize || 14,
      }}
    >
      {props.children}
    </div>
  )
}

function CustomDivider() {
  return (
    <div
      style={{
        height: 1,
        backgroundImage: 'linear-gradient(to left, black 50%, rgba(255, 255, 255, 0) 0)',
        backgroundPosition: 'bottom',
        backgroundSize: 'calc(100% / 30)',
        backgroundRepeat: 'repeat-x',
      }}
    />
  )
}

export default function PromotionList(props: PromotionListProps) {
  const { data } = props
  const { customer_sales } = data

  const size = {
    medium: 18,
    big: 24,
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <Row justify="space-between" style={{ margin: '0 15px' }}>
        <Col>
          <CustomText fontSize={size.big} fontWeight="bold" color="#af2525">
            {data.company_name}
          </CustomText>
          <CustomText fontSize={size.big} fontWeight="bold">
            SALES ORDER
          </CustomText>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <CustomText fontSize={size.big} fontWeight="bold">
            {data.branch_name}
          </CustomText>
          <CustomText fontSize={size.medium} fontWeight="bold">
            Order Date : {dateFormat(data.order_date, 'DD, MMM YYYY')}
          </CustomText>
        </Col>
      </Row>
      <CustomDivider />
      <Row justify="space-between" style={{ margin: '0 15px' }}>
        <Col>
          <CustomText fontSize={size.big} fontWeight="bold">
            {data.customer_name}
          </CustomText>
          <CustomText>address not implemented now!</CustomText>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <CustomText>Customer Group: {customer_sales.customer_group_name}</CustomText>
          <CustomText>
            Price Group : {`${customer_sales.price_group_id} - ${customer_sales.price_group_name}`}
          </CustomText>
          <CustomText>
            Channel :
            <span style={{ fontWeight: 'bold' }}>
              {` ${data.channel_id} - ${data.channel_name}`}
            </span>
          </CustomText>
        </Col>
      </Row>
      <Row>
        <Table
          tableLayout="fixed"
          bordered
          pagination={false}
          columns={ColumnsPromotionList as ColumnsType}
          dataSource={[
            ...data.items,
            { gross_total_amount: data.gross_total_amount },
            { dpp_total_amount: data.dpp_total_amount },
            { discount_total_amount: data.discount_total_amount },
            { net_total_amount: data.net_total_amount },
            { tax_total_amount: data.tax_total_amount },
            { total_amount: data.total_amount },
          ]}
        />
      </Row>
    </div>
  )
}
