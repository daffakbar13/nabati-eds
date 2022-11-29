/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import moment from 'moment'
import DateFormat from 'src/components/DateFormat'
import TaggedStatus from 'src/components/TaggedStatus'

import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'

function Linked({
  link,
  linkType,
  type,
  status,
}: {
  link: string
  linkType: string
  type: 'id' | 'action'
  status?: string
}) {
  const router = useRouter()
  const navigate = () => {
    if (linkType == 'id') {
      if (status == 'Pending') {
        router.push(`${PATH.LOGISTIC}/good-receipt-intra-branch/edit/${link}`)
      } else {
        router.push(`${PATH.LOGISTIC}/good-receipt-intra-branch/detail/${link}`)
      }
    } else if (linkType == 'PO') {
      router.push(`${PATH.LOGISTIC}/po-sto/detail/${link}`)
    } else if (linkType == 'DO') {
      router.push(`${PATH.LOGISTIC}/do-sto/detail/${link}`)
    } else if (linkType == 'GI') {
      router.push(`${PATH.LOGISTIC}/good-issue/detail/${link}`)
    }
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

export const columns = [
  CreateColumns(
    'PO Number',
    'po_number',
    true,
    (link: string, { status }: any) => <Linked link={link} type="id" linkType="PO" />,
    180,
    'left',
  ),
  CreateColumns(
    'DO Number',
    'delivery_number',
    true,
    (link: string, { status_name }: any) => <Linked link={link} type="id" linkType="DO" />,
    180,
    'left',
  ),
  CreateColumns(
    'GI Number',
    'gi_number',
    true,
    (link: string, { status_name }: any) => <Linked link={link} type="id" linkType="GI" />,
    180,
    'left',
  ),
  CreateColumns(
    'GR Number',
    'id',
    true,
    (link: string, { status }: any) => (
      <Linked link={link} type="id" linkType="id" status={status} />
    ),
    180,
    'left',
  ),
  CreateColumns(
    'Posting Date',
    'posting_date',
    false,
    (date) => <DateFormat date={date} format="DD-MM-YYYY" />,
    180,
  ),
  CreateColumns('Company', 'company_id', false, (company_id, rec) => (
    <>{`${company_id} - ${rec.company_name}`}</>
  )),
  CreateColumns(
    'Supplying Branch',
    'suppl_branch_id',
    false,
    (suppl_branch_id, rec) => <>{`${suppl_branch_id} - ${rec.suppl_branch_name}`}</>,
    250,
  ),
  CreateColumns(
    'Receiving Branch',
    'receive_plant_id',
    false,
    (receive_plant_id, rec) => <>{`${receive_plant_id} - ${rec.receive_plant_name}`}</>,
    250,
  ),
  CreateColumns('Mov. Type', 'movement_type_id', false),
  CreateColumns('Status', 'status', false, (status) => <TaggedStatus status={status} />),
  CreateColumns('Action', 'id', false, (link, record) => (
    <Linked link={link} type="action" linkType="id" status={record.status} />
  )),
]
