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
      Address: data?.address,
      'Location Lattitude': customer_sales_data?.lattitude,
      'Sales Region': data?.region_id,
      'Transportation Zone': data?.transportation_zone_id,
      City: data?.city,
      'Location Longitude': customer_sales_data?.long_lattitude,
      'Sales District': concatString(
        customer_sales_data?.sales_district_id,
        customer_sales_data?.sales_district_id,
      ),
    },
    'Sold to Customer': {
      Customer: concatString(data?.sold_to_customer_id, data?.sold_to_customer_name),
      Address: data?.sold_to_address,
      'Location Lattitude': data?.sold_to_loc_lat,
      'Location Longitude': data?.sold_to_loc_long_lat,
    },
    'Ship to Customer': {
      Customer: concatString(data?.ship_to_customer_id, data?.ship_to_customer_name),
      Address: data?.ship_to_address,
      'Location Lattitude': data?.ship_to_loc_lat,
      'Location Longitude': data?.ship_to_loc_long_lat,
    },
    'Bill to Customer': {
      Customer: concatString(data?.bill_to_customer_id, data?.bill_to_customer_name),
      Address: data?.bill_to_address,
      'Location Lattitude': data?.bill_to_loc_lat,
      'Location Longitude': data?.bill_to_loc_long_lat,
    },
    'Pay to Customer': {
      Customer: concatString(data?.pay_to_customer_id, data?.pay_to_customer_name),
      Address: data?.pay_to_address,
      'Location Lattitude': data?.pay_to_loc_lat,
      'Location Longitude': data?.pay_to_loc_long_lat,
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
