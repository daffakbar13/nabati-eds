/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import DateFormat from 'src/components/DateFormat'
import { Tag } from 'antd'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.SALES}/quotation/edit/${link}`)
      : router.push(`${PATH.SALES}/quotation/detail/${link}?status=${status}`)
  }
  const [hover, setHover] = React.useState(false)

  return (
    <>
      {type === 'id' ? (
        <div
          onClick={navigate}
          onMouseEnter={() => {
            setHover(true)
          }}
          onMouseLeave={() => {
            setHover(false)
          }}
          style={{
            cursor: 'pointer',
            ...(hover && { color: '#EB008B', textDecoration: 'underline' }),
          }}
        >
          {link}
        </div>
      ) : (
        <Button size="big" variant="tertiary" onClick={navigate}>
          View Detail
        </Button>
      )}
    </>
  )
}

export const useColumnQuotation = [
  CreateColumns(
    'Quotation',
    'id',
    true,
    (link: string, { status_name }: any) => <Linked link={link} type="id" status={status_name} />,
    170,
    true,
    'have-checkbox',
  ),
  CreateColumns(
    'Order Type',
    'order_type_id',
    false,
    undefined,
    120,
  ),
  CreateColumns(
    'Order Date',
    'order_date',
    false,
    (date) => <DateFormat date={date} format='DD-MM-YYYY' />,
    120,
  ),
  CreateColumns(
    'Sales Org.',
    'sales_org_id',
    false,
    undefined,
    110,
  ),
  CreateColumns(
    'Branch',
    'branch_id',
    false,
    undefined,
    90,
  ),
  CreateColumns(
    'Sold To Customer',
    'sold_to_customer_id',
    false,
    (id, { customer_name }) => [id, customer_name].join(' - '),
    250,

  ),
  CreateColumns(
    'Ship To Customer',
    'ship_to_customer_id',
    false,
    (id, { customer_name }) => [id, customer_name].join(' - '),
    250,

  ),
  CreateColumns(
    'Salesman',
    'salesman_id',
    false,
    undefined,
    105,

  ),
  CreateColumns(
    'Total Amount',
    'total_amount',
    false,
    (total_amount) => parseInt(total_amount).toLocaleString(),
    140,

  ),
  CreateColumns(
    'Create From',
    'created_from',
    false,
    undefined,
    125,
  ),
  CreateColumns(
    'Status',
    'status_name',
    false,
    (status) => <Tag {...(status === 'Complete' && { color: 'green' })} > {status}</Tag>,
    110,
  ),
  CreateColumns(
    'Status Process',
    'status_process_id',
    false,
    (status_process) => <>{status_process !== '' && <Tag> {status_process}</Tag>}</>,
  ),
  CreateColumns(
    'Action',
    'id',
    false,
    (link, record) => <Linked link={link} type="action" status={record.status_name} />,
  ),
]