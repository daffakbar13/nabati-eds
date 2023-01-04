/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import dateFormat from 'src/utils/dateFormat'
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({ link, type }: { link: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    router.push(`${PATH.LOGISTIC}/gi-disposal/detail/${link}`)
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
    (link: string, record: any) => <Linked link={link} type="id" />,
    175,
    'left',
  ),
  CreateColumns('Posting Date', 'posting_date', false, (date) => dateFormat(date)),
  CreateColumns(
    'Company',
    'company_id',
    false,
    (text: string, record: any) => `${record.company_id || ''} - ${record.company_name || ''}`,
  ),
  CreateColumns(
    'Branch',
    'suppl_branch_id',
    false,
    (text: string, record: any) => `${record.branch_id || ''} - ${record.branch_name || ''}`,
  ),
  CreateColumns(
    'Sloc',
    'supplying_sloc_id',
    false,
    (text: string, record: any) => `${record.sloc_id || ''} - ${record.sloc_name || ''}`,
  ),
  CreateColumns(
    'Mov. Type',
    'movement_type_id',
    false,
    (text: string, record: any) => `${record.movement_type_id || ''}`,
  ),
  CreateColumns(
    'Header Text',
    'header_text',
    false,
    (text: string, record: any) =>
      `${record.header_text !== '' && record.header_text != null ? record.header_text : '-'}`,
  ),
  CreateColumns('Status', 'status_name', false, (status_name) => (
    <TaggedStatus status={status_name} />
  )),
  CreateColumns('Action', 'reservation_number', false, (link) => (
    <Linked link={link} type="action" />
  )),
]
