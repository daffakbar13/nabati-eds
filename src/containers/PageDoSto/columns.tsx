/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React from 'react'
import moment from 'moment';
import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import DateFormat from 'src/components/DateFormat'
import { Tag } from 'antd'
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    status === 'Draft'
      ? router.push(`${PATH.LOGISTIC}/do-sto/edit/${link}`)
      : router.push(`${PATH.LOGISTIC}/do-sto/detail/${link}?status=${status}`)
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
    'purchase_id',
    true,
    (link: string, { status_name }: any) => <Linked link={link} type="id" status={status_name} />,
    180,
    'left',
  ),
  CreateColumns(
    'DO Number',
    'id',
    true,
    (link: string, { status_name }: any) => <Linked link={link} type="id" status={status_name} />,
    180,
    'left',
  ),
  CreateColumns(
    'Posting Date',
    'created_at',
    false,
    (date) => <DateFormat date={date} format='DD-MM-YYYY' />,
    180,
    'left',
  ),
  CreateColumns(
    'Company',
    'company_id',
    false,
    (company_id, rec) => <>{`${company_id || ''} - ${rec.company_name || ''}`}</>,
  ),
  CreateColumns(
    'Supplying Branch',
    'supply_branch_id',
    false,
    (branch, rec) => <>{`${branch} - ${rec.supply_branch_name}`}</>,
    250,
  ),
  CreateColumns(
    'Receiving Branch',
    'receive_branch_id',
    false,
    (branch, rec) => <>{`${branch} - ${rec.receive_branch_name}`}</>,
    250,
  ),
  CreateColumns(
    'Status',
    'status',
    false,
    (status_process) => <TaggedStatus status={status_process} />,
  ),
  CreateColumns(
    'Action',
    'id',
    false,
    (link, record) => <Linked link={link} type="action" status={record.status_name} />,
  ),
]
