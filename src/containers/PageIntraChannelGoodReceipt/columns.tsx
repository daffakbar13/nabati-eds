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
    if (linkType == 'id') {
      router.push(`${PATH.LOGISTIC}/goods-receipt-intra-channel/detail/${link}`)
    } else if (linkType == 'deliveryNumber') {
      router.push(`${PATH.LOGISTIC}/request-intra-channel/detail/${link}`)
    } else if (linkType == 'goodIssue') {
      router.push(`${PATH.LOGISTIC}/goods-issue-intra-channel/detail/${link}`)
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

export const TableIntraChannelGoodReceipt = [
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
    'gi_number',
    true,
    (link: string, record: any) => <Linked link={link} type="id" linkType="goodIssue" />,
    175,
    'left',
  ),
  CreateColumns(
    'GR Number',
    'id',
    true,
    (link: string, record: any) => <Linked link={link} type="id" linkType="id" />,
    175,
    'left',
  ),
  CreateColumns('Posting Date', 'posting_date', false, (date) => dateFormat(date)),
  CreateColumns(
    'Company',
    'company_id',
    false,
    (text: string, record: any) => `${record.company_id} - ${record.company_name}`,
  ),
  CreateColumns(
    'Supplying Branch',
    'suppl_branch_id',
    false,
    (text: string, record: any) => `${record.suppl_branch_id} - ${record.suppl_branch_name}`,
  ),
  CreateColumns(
    'Receiving Branch',
    'receive_plant_id',
    false,
    (text: string, record: any) => `${record.receive_plant_id} - ${record.receive_plant_name}`,
  ),
  CreateColumns(
    'Mov. Type',
    'movement_type_id',
    false,
    (text: string, record: any) => `${record.movement_type_id} - ${record.movement_type_name}`,
  ),
  CreateColumns('Status', 'status', false, (status) => <TaggedStatus status={status} />),
  CreateColumns('Action', 'id', false, (link, record) => (
    <Linked link={link} type="action" linkType="id" />
  )),
]

export const TableIntraChannelGoodReceiptDetail = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1),
  CreateColumns(
    'Item Sender',
    'product_id',
    false,
    (text: string, record: any) => `${record.product_id || ''} - ${record.product_name || ''}`,
  ),
  CreateColumns(
    'Item Receiver',
    'product_receiver_id',
    false,
    (text: string, record: any) =>
      `${record.product_receiver_id || ''} - ${record.product_receiver_name || ''}`,
  ),
  CreateColumns('Qty', 'qty', false),
  CreateColumns('UoM', 'uom_id', false),
  CreateColumns('Batch', 'batch', false),
  CreateColumns('Remarks', 'remarks', false),
]
