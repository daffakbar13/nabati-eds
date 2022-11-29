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
      router.push(`${PATH.LOGISTIC}/goods-issue-intra-sloc/detail/${link}`)
    } else if (linkType == 'deliveryNumber') {
      router.push(`${PATH.LOGISTIC}/request-intra-sloc/detail/${link}`)
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
    'Request Number',
    'delivery_number',
    true,
    (link: string, record: any) => <Linked link={link} type="id" linkType="deliveryNumber" />,
    175,
    'left',
  ),
  CreateColumns(
    'GI Number',
    'id',
    true,
    (link: string, record: any) => <Linked link={link} type="id" linkType="id" />,
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
    (text: string, record: any) =>
      `${record.suppl_branch_id || ''} - ${record.suppl_branch_name || ''}`,
  ),
  CreateColumns(
    'From Sloc',
    'from_sloc',
    false,
    (text: string, record: any) => `${record.from_sloc || ''} - ${record.from_sloc_name || ''}`,
  ),
  CreateColumns(
    'To Sloc',
    'to_sloc',
    false,
    (text: string, record: any) => `${record.to_sloc || ''} - ${record.to_sloc_name || ''}`,
  ),
  CreateColumns(
    'Mov. Type',
    'branch_id',
    false,
    (text: string, record: any) => `${record.movement_type_id || ''}`,
  ),
  CreateColumns('Status', 'status', false, (status) => <TaggedStatus status={status} />),
  CreateColumns('Action', 'id', false, (link, record) => (
    <Linked link={link} type="action" linkType="id" />
  )),
]
