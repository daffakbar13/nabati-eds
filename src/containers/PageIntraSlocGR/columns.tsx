import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'
import Link from 'src/components/Link'
import { concatString } from 'src/utils/concatString'

export function useColumnsIntraSlocGoodReceipt() {
  const router = useRouter()

  return [
    addColumn({
      title: 'Request Number',
      dataIndex: 'request_number',
      render: (text, record, index) => (
        <Link onClick={() => router.push(`${PATH.LOGISTIC}/request-intra-sloc/detail/${text}`)}>
          {text}
        </Link>
      ),
      fixed: true,
      sorter: true,
      width: 175,
    }),
    addColumn({
      title: 'GI Number',
      dataIndex: 'gi_number',
      render: (text, record, index) => (
        <Link
          onClick={() =>
            router.push(
              `${PATH.LOGISTIC}/goods-issue-intra-sloc/detail/${text}?request_number=${record.request_number}`,
            )
          }
        >
          {text}
        </Link>
      ),
      fixed: true,
      sorter: true,
      width: 175,
    }),
    addColumn({
      title: 'GR Number',
      dataIndex: 'gr_number',
      render: (text, record, index) => (
        <Link
          onClick={() =>
            router.push(
              `${PATH.LOGISTIC}/goods-receipt-intra-sloc/detail/${text}?request_number=${record.request_number}`,
            )
          }
        >
          {text}
        </Link>
      ),
      fixed: true,
      sorter: true,
      width: 175,
    }),
    addColumn({
      title: 'Posting Date',
      dataIndex: 'posting_date',
    }),
    addColumn({
      title: 'Company',
      dataIndex: 'company_id',
      render: (text, record, index) => `${text || ''} - ${record.company_name || ''}`,
    }),
    addColumn({
      title: 'Branch',
      dataIndex: 'branch_id',
      render: (text, record, index) => `${text || ''} - ${record.branch_name || ''}`,
    }),
    addColumn({
      title: 'From Sloc',
      dataIndex: 'from_sloc',
      render: (text, record, index) => `${text || ''} - ${record.from_sloc_name || ''}`,
    }),
    addColumn({
      title: 'To Sloc',
      dataIndex: 'to_sloc',
      render: (text, record, index) => `${text || ''} - ${record.to_sloc_name || ''}`,
    }),
    addColumn({
      title: 'Mov. Type',
      dataIndex: 'movement_type_id',
      render: (text, record, index) => `${text || ''}`,
    }),
    addColumn({
      title: 'Status',
      dataIndex: 'status',
      render: (text, record, index) => <TaggedStatus status={text} />,
    }),
    addColumn({
      title: 'Action',
      dataIndex: 'gr_number',
      render: (text, record, index) => (
        <Button
          size="big"
          variant="tertiary"
          onClick={() =>
            router.push(
              `${PATH.LOGISTIC}/goods-receipt-intra-sloc/detail/${text}?request_number=${record.request_number}`,
            )
          }
        >
          View Detail
        </Button>
      ),
    }),
  ]
}
