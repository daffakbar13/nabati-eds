/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { Col, Row, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import TitleDataList from 'src/components/TitleDataList'
import { useSalesSalesOrderDetailContext } from 'src/hooks/contexts'
import dateFormat from 'src/utils/dateFormat'
import { ColumnsPromotionList } from '../../columns'

function Line(props: { hidden: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      <div
        style={{
          ...(props.hidden && { display: 'none' }),
          height: 2,
          width: '100%',
          margin: 'auto',
          borderBottom: '2px solid #88888888',
        }}
      ></div>
    </div>
  )
}

interface DotPromotionLogProps {
  dotted?: boolean
  hideLeft?: boolean
  hideRight?: boolean
}

function DotPromotionLog(props: DotPromotionLogProps) {
  const { dotted, hideLeft, hideRight } = props
  return (
    <div style={{ display: 'flex' }}>
      <Line hidden={hideLeft} />
      <div
        style={{
          width: 15,
          height: 15,
          borderRadius: '50%',
          background: dotted ? 'green' : 'red',
        }}
      ></div>
      <Line hidden={hideRight} />
    </div>
  )
}

export default function PromotionList() {
  const {
    state: { data },
  } = useSalesSalesOrderDetailContext()
  const { customer_sales } = data

  const dataLog = []
  for (let index = 0; index < 10; index++) {
    dataLog.push({
      id: '123123123123123123123',
      date_time: index % 2 === 0,
      sales_order: index % 2 === 1,
      cust_attribute: index % 2 === 0,
      product_combination: index % 2 === 1,
      budget: index % 2 === 0,
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <TitleDataList title="Promotion Detail" />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <b>1. DISC IPT DIVISI 1 RETAIL</b>
          <div style={{ color: 'red' }}>123123123123123123</div>
        </div>
        <b>01 Dec 22 to 31 Dec 22</b>
      </div>
      <table className="eds_promotion_list">
        <thead>
          <tr>
            <th>No</th>
            <th>PID</th>
            <th>Product Name</th>
            <th>UoM</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Discount %</th>
            <th>Discount %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>300141</td>
            <td>NABATI RCB 50G GT (60PCS)</td>
            <td>CTN</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
          </tr>
          <tr>
            <td colSpan={7} style={{ textAlign: 'left' }}>
              Total Discount
            </td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <b>2. KSN-PROMO PAKET WAFER RCO 1000 & TB 2000 - RETAIL</b>
          <div style={{ color: 'red' }}>123123123123123123</div>
        </div>
        <b>01 Dec 22 to 31 Dec 22</b>
      </div>
      <table className="eds_promotion_list">
        <thead>
          <tr>
            <th>No</th>
            <th>PID</th>
            <th>Product Name</th>
            <th>UoM</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Discount %</th>
            <th>Discount %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>300141</td>
            <td>NABATI RCO 50G GT (60PCS)</td>
            <td>CTN</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
          </tr>
          <tr>
            <td colSpan={7} style={{ textAlign: 'left' }}>
              Total Discount
            </td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
      <b>Promotion Log</b>
      <table className="eds_promotion_log" cellPadding={0}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Promo ID</th>
            <th>Date Time</th>
            <th>Sales Order</th>
            <th>Cust Attribute</th>
            <th>Product Combination</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {dataLog.map((e, i) => (
            <tr key={i}>
              <td style={{ textDecoration: 'underline' }}>
                <b style={{ cursor: 'pointer' }}>{e.id}</b>
              </td>
              <td>
                <DotPromotionLog dotted={e.date_time} hideLeft />
              </td>
              <td>
                <DotPromotionLog dotted={e.sales_order} />
              </td>
              <td>
                <DotPromotionLog dotted={e.cust_attribute} />
              </td>
              <td>
                <DotPromotionLog dotted={e.product_combination} />
              </td>
              <td>
                <DotPromotionLog dotted={e.budget} hideRight />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
