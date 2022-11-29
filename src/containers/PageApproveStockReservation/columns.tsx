/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import DateFormat from 'src/components/DateFormat'
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({
  link,
  linkType,
  type,
}: {
  link: string
  linkType: string
  type: 'id' | 'action'
}) {
  const router = useRouter()
  const navigate = () => {
    if (linkType == 'id') {
      router.push(`${PATH.LOGISTIC}/approval-stock-reservation/detail/${link}`)
    } else if (linkType == 'docNumber') {
      router.push(`${PATH.LOGISTIC}/stock-reservation/detail/${link}`)
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

export const column = [
  CreateColumns(
    'Reservation Number',
    'reservation_number',
    true,
    (link: string, record: any) => <Linked link={link} type="id" linkType="id" />,
    175,
    'left',
  ),
  CreateColumns(
    'Doc. Number',
    'doc_number',
    true,
    (link: string, record: any) => <Linked link={link} type="id" linkType="docNumber" />,
    175,
    'left',
  ),
  CreateColumns('Posting Date', 'posting_date', false, (date) => (
    <DateFormat date={date} format="DD-MM-YYYY" />
  )),
  CreateColumns(
    'Company',
    'company_id',
    false,
    (text: string, record: any) => `${record.company_id || ''} - ${record.company_name || ''}`,
  ),
  CreateColumns(
    'Branch',
    'branch_id',
    false,
    (text: string, record: any) => `${record.branch_id || ''} - ${record.branch_name || ''}`,
  ),
  CreateColumns(
    'Suppling SLoc',
    'supplying_sloc_id',
    false,
    (text: string, record: any) =>
      `${record.supplying_sloc_id || ''} - ${record.supplying_sloc_name || ''}`,
  ),
  CreateColumns(
    'Receiving SLoc',
    'receiving_sloc_id',
    false,
    (text: string, record: any) =>
      `${record.receiving_sloc_id || ''} - ${record.receiving_sloc_name || ''}`,
  ),
  CreateColumns(
    'Mov. Type',
    'branch_id',
    false,
    (text: string, record: any) =>
      `${record.movement_type_id || ''}- ${record.movement_type_name || ''}`,
  ),
  CreateColumns('Header Text', 'header_text', false),
  CreateColumns('Status', 'status_name', false, (status_name) => (
    <TaggedStatus status={status_name} />
  )),
  CreateColumns('Action', 'reservation_number', false, (link, record) => (
    <Linked link={link} type="action" linkType="id" />
  )),
]
