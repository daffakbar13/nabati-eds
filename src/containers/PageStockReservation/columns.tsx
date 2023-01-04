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
    if (linkType === 'id') {
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
    'Doc. Number',
    'doc_number',
    true,
    (link: string) => <Linked link={link} type="id" linkType="id" />,
    175,
    'left',
  ),
  CreateColumns('Requirement Date', 'requirement_date', false, (date) => dateFormat(date)),
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
    'Mov. Type',
    'branch_id',
    false,
    (text: string, record: any) =>
      `${record.movement_type_id || ''}- ${record.movement_type_name || ''}`,
  ),
  CreateColumns('Status', 'status_name', false, (status_name) => (
    <TaggedStatus status={status_name} />
  )),
  CreateColumns('Action', 'doc_number', false, (link) => (
    <Linked link={link} type="action" linkType="id" />
  )),
]
