/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React from 'react'
import moment from 'moment'
import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'

import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'

import DateFormat from 'src/components/DateFormat'
import { Tag } from 'antd'
import Link from 'src/components/Link'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.LOGISTIC}/goods-receipt/edit/${link}`)
      : router.push(`${PATH.LOGISTIC}/goods-receipt/detail/${link}?status=${status}`)
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

export const columns = (goToDetail: (id: string) => {}) => [
  CreateColumns(
    'GR Number',
    'gr_number',
    true,
    (text: string) => <Link onClick={() => goToDetail(text)}>{text}</Link>,
    180,
    'left',
  ),
  CreateColumns(
    'PO Number',
    'po_number',
    true,
  ),
  CreateColumns(
    'GI Number',
    'gi_number',
    true,
  ),
  CreateColumns(
    'Posting Date',
    'posting_date',
    true,
    (date) => <>{moment(date).isValid ?? moment(date).format('YYYY-MM-DD HH:mm')}</>,
    180,
  ),
  CreateColumns(
    'Company',
    'company_id',
    true,
  ),
  CreateColumns(
    'Branch',
    'branch_id',
    true,
    (branch, rec) => <>{`${branch} - ${rec.branch_name}`}</>,
    250,
  ),
  CreateColumns(
    'Vendor',
    'vendor_id',
    true,
    (vendor, rec) => <>{`${vendor} - ${rec.vendor_name}`}</>,
    250,
  ),
  CreateColumns(
    'Move Type',
    'movement_type_id',
    true,
  ),
  CreateColumns(
    'Header Text',
    'header_text',
    true,
  ),
  CreateColumns(
    'Delivery Note',
    'delivery_note',
    true,
  ),
  CreateColumns(
    'Status ID',
    'status_id',
    false,
    (statusId) => <>{statusId !== '' && <Tag>{statusId}</Tag>}</>,
  ),
  CreateColumns(
    'Action',
    'gr_number',
    false,
    (text) => <Button size="big" variant="tertiary" onClick={() => goToDetail(text)}>
      View Detail
    </Button>,
  ),
]
