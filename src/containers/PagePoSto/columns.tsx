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
      ? router.push(`${PATH.LOGISTIC}/po-sto/edit/${link}`)
      : router.push(`${PATH.LOGISTIC}/po-sto/detail/${link}`)
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
    (text: string, record: any) => `${record.company_id || ''} - ${record.company_name || ''}`,
  ),
  CreateColumns(
    'Supplying Branch',
    'suppl_branch_id',
    false,
    (branch, rec) => <>{`${branch} - ${rec.suppl_branch_name}`}</>,
    250,
  ),
  CreateColumns(
    'Receiving Branch',
    'receive_plant_id',
    false,
    (branch, rec) => <>{`${branch} - ${rec.receive_plant_name}`}</>,
    250,
  ),
  CreateColumns(
    'Status',
    'status',
    false,
    (status) => <TaggedStatus status={status} />,
  ),
  CreateColumns(
    'Action',
    'id',
    false,
    (link, record) => <Linked link={link} type="action" status={record.status_name} />,
  ),
]