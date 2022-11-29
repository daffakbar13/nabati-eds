/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import moment from 'moment'
import DateFormat from 'src/components/DateFormat'
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({ link, type }: { link: string; type: 'id' | 'action' }) {
  const router = useRouter()
  const navigate = () => {
    router.push(`${PATH.LOGISTIC}/transfer-to-gs/detail/${link}`)
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
    'Doc. Number',
    'document_number',
    true,
    (link: string, record: any) => <Linked link={link} type="id" />,
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
    'suppl_branch_id',
    false,
    (text: string, record: any) => `${record.branch_id || ''} - ${record.branch_name || ''}`,
  ),
  CreateColumns(
    'Supplying Sloc',
    'supplying_sloc_id',
    false,
    (text: string, record: any) =>
      `${record.supplying_sloc_id || ''} - ${record.supplying_sloc_name || ''}`,
  ),
  CreateColumns(
    'Receiving Sloc',
    'receiving_sloc_id',
    false,
    (text: string, record: any) =>
      `${record.receiving_sloc_id || ''} - ${record.receiving_sloc_name || ''}`,
  ),
  CreateColumns('Status', 'status_name', false, (status_name) => (
    <TaggedStatus status={status_name} />
  )),
  CreateColumns('Action', 'document_number', false, (link, record) => (
    <Linked link={link} type="action" />
  )),
]
