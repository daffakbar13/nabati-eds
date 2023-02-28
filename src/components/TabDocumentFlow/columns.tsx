/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
import { Typography } from 'antd'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { addColumn } from 'src/utils/createColumns'
import Link from '../Link'

function Linked(props: { process: string; id: string; status: string }) {
  const { id, process, status } = props
  const router = useRouter()
  let document: string
  switch (process) {
    case 'Quotation':
      document = 'quotation'
      break
    case 'Sales Order':
      document = 'sales-order'
      break
    case 'Delivery':
      document = 'delivery-order'
      break
    case 'Shipment':
      document = 'shipment'
      break
    case 'Invoice':
      document = 'billing'
      break
    default:
      break
  }

  return (
    <div>
      <Typography.Text
        copyable={{ text: id }}
        onClick={() =>
          router.push({
            pathname: `${PATH.SALES}/${document}/detail/${id}`,
            query: { status },
          })
        }
      >
        <Link style={{ display: 'inline' }}>{id}</Link>
      </Typography.Text>
    </div>
  )
}

export const useColumnsDocumentFlow = [
  addColumn({
    title: 'Process',
    dataIndex: 'doc_category_name',
  }),
  addColumn({
    title: 'Doc. Number',
    dataIndex: 'document_id',
    render: (id, { doc_category_name, status_name }) => (
      <Linked id={id} process={doc_category_name} status={status_name} />
    ),
  }),
  addColumn({
    title: 'Created Date',
    dataIndex: 'created_at',
  }),
  addColumn({
    title: 'Created By',
    dataIndex: 'created_by',
  }),
  addColumn({
    title: 'Modified Date',
    dataIndex: 'modified_at',
  }),
  addColumn({
    title: 'Modified By',
    dataIndex: 'modified_by',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
    render: (s: string) => (s === 'Draft' ? 'New' : s),
  }),
]
