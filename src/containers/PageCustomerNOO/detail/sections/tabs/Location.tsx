/* eslint-disable camelcase */
import React from 'react'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { concatString } from 'src/utils/concatString'
import { Col, Divider, Row } from 'antd'
import TitleDataList from 'src/components/TitleDataList'
import DataList from 'src/components/DataList'

const LimitData = {
  Address: 4,
  'Sold to Customer': 2,
  'Ship to Customer': 2,
  'Bill to Customer': 2,
  'Pay to Customer': 2,
}

export default function Location() {
  const {
    state: { data },
  } = useSalesQuotationDetailContext()
  const {
    customer,
    customer_sales_data,
    sold_to_customer,
    ship_to_customer,
    bill_to_customer,
    pay_to_customer,
  } = data

  const dataCustomer: any = {
    Address: {
      Address: customer?.address,
      'Location Lattitude': customer_sales_data?.lattitude,
      'Sales Region': customer?.region_id,
      'Transportation Zone': customer?.transportation_zone_id,
      City: customer?.city,
      'Location Longitude': customer_sales_data?.long_lattitude,
      'Sales District': concatString(
        customer_sales_data?.sales_district_id,
        customer_sales_data?.sales_district_id,
      ),
    },
    'Sold to Customer': {
      Customer: concatString(
        sold_to_customer?.sold_to_customer_id,
        sold_to_customer?.sold_to_customer_name,
      ),
      Address: sold_to_customer?.sold_to_address,
      'Location Lattitude': sold_to_customer?.sold_to_loc_lat,
      'Location Longitude': sold_to_customer?.sold_to_loc_long_lat,
    },
    'Ship to Customer': {
      Customer: concatString(
        ship_to_customer?.ship_to_customer_id,
        ship_to_customer?.ship_to_customer_name,
      ),
      Address: ship_to_customer?.ship_to_address,
      'Location Lattitude': ship_to_customer?.ship_to_loc_lat,
      'Location Longitude': ship_to_customer?.ship_to_loc_long_lat,
    },
    'Bill to Customer': {
      Customer: concatString(
        bill_to_customer?.bill_to_customer_id,
        bill_to_customer?.bill_to_customer_name,
      ),
      Address: bill_to_customer?.bill_to_address,
      'Location Lattitude': bill_to_customer?.bill_to_loc_lat,
      'Location Longitude': bill_to_customer?.bill_to_loc_long_lat,
    },
    'Pay to Customer': {
      Customer: concatString(
        pay_to_customer?.pay_to_customer_id,
        pay_to_customer?.pay_to_customer_name,
      ),
      Address: pay_to_customer?.pay_to_address,
      'Location Lattitude': pay_to_customer?.pay_to_loc_lat,
      'Location Longitude': pay_to_customer?.pay_to_loc_long_lat,
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
