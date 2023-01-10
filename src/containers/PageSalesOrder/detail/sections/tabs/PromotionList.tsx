/* eslint-disable function-paren-newline */
/* eslint-disable no-plusplus */
import Router from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { getPromotionList } from 'src/api/sales-order'
import Link from 'src/components/Link'
import TitleDataList from 'src/components/TitleDataList'
import currency from 'src/utils/currencyFormat'
import dateFormat from 'src/utils/dateFormat'

function PromotionDetail(props: { data: any[] }) {
  const { data } = props
  const columns = ['No', 'PID', 'Product Name', 'UoM', 'Qty', 'Price', 'Discount %', 'Discount %']

  return (
    <>
      {data.map((d, i) => {
        const from_date = dateFormat(d.promotion_valid_from)
        const to_date = dateFormat(d.promotion_valid_to)

        return (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <b>1. {d.promotion_name}</b>
                <div style={{ color: 'red' }}>{d.promotion_id}</div>
              </div>
              <b>
                {from_date} to {to_date}
              </b>
            </div>
            <table className="eds_promotion_list">
              <thead>
                <tr>
                  {columns.map((c, idx) => (
                    <th key={idx}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...d.products].map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.no}</td>
                    <td>{p.product_id}</td>
                    <td>{p.product_name}</td>
                    <td>{p.product_uom}</td>
                    <td>{p.product_qty}</td>
                    <td>{currency(p.price)}</td>
                    <td></td>
                    <td>{p.discount}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={7} style={{ textAlign: 'left' }}>
                    Total Discount
                  </td>
                  <td>{currency(d.total_amount)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      })}
    </>
  )
}

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

function TablePromotionLog(props: { data: any[] }) {
  const { data } = props
  const columns = [
    'Promo ID',
    'Date Time',
    'Sales Order',
    'Cust Attribute',
    'Product Combination',
    'Budget',
  ]
  return (
    <table className="eds_promotion_log" cellPadding={0}>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={i} style={{ textAlign: i === 0 ? 'left' : 'center' }}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i}>
            <td style={{ textDecoration: 'underline' }}>
              <Link>
                <b style={{ cursor: 'pointer' }}>{d.promotion_id}</b>
              </Link>
            </td>
            <td>
              <DotPromotionLog dotted={d.datetime_check} hideLeft />
            </td>
            <td>
              <DotPromotionLog dotted={d.sales_order_check} />
            </td>
            <td>
              <DotPromotionLog dotted={d.customer_attribute_check} />
            </td>
            <td>
              <DotPromotionLog dotted={d.product_combination_check} />
            </td>
            <td>
              <DotPromotionLog dotted={d.company_id_check} hideRight />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function PromotionList() {
  const { data, isSuccess } = useQuery('Promotion Lists', () =>
    getPromotionList({ id: Router.query.id as string }).then((res) => res.data),
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {isSuccess && (
        <>
          {data.promotion_data !== null && (
            <>
              <TitleDataList title="Promotion Detail" />
              <PromotionDetail data={data.promotion_data} />
            </>
          )}
          <TitleDataList title="Promotion Log" />
          <TablePromotionLog data={data.promotion_logs} />
        </>
      )}
    </div>
  )
}
