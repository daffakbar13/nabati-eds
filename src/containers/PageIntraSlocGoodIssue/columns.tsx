import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'
import Link from 'src/components/Link'
import { concatString } from 'src/utils/concatString'

export function useColumnsIntraSlocGoodIssue() {
  const router = useRouter()

  return [
    addColumn({
      title: 'Request Number',
      render: (_, { delivery_number }) => (
        <Link
          onClick={() =>
            router.push(`${PATH.LOGISTIC}/request-intra-sloc/detail/${delivery_number}`)
          }
        >
          {delivery_number}
        </Link>
      ),
      fixed: true,
      sorter: true,
    }),
    addColumn({
      title: 'GI Number',
      render: (_, { id }) => (
        <Link onClick={() => router.push(`${PATH.LOGISTIC}/goods-issue-intra-sloc/detail/${id}`)}>
          {id}
        </Link>
      ),
      fixed: true,
      sorter: true,
    }),
    addColumn({
      title: 'Posting Date',
      dataIndex: 'posting_date',
    }),
    addColumn({
      title: 'Company',
      render: (_, { company_id, company_name }) => concatString(company_id, company_name),
    }),
    addColumn({
      title: 'Branch',
      render: (_, { suppl_branch_id, suppl_branch_name }) =>
        concatString(suppl_branch_id, suppl_branch_name),
    }),
    addColumn({
      title: 'From Sloc',
      render: (_, { from_sloc, from_sloc_name }) => concatString(from_sloc, from_sloc_name),
    }),
    addColumn({
      title: 'To Sloc',
      render: (_, { to_sloc, to_sloc_name }) => concatString(to_sloc, to_sloc_name),
    }),
    addColumn({
      title: 'Mov. Type',
      dataIndex: 'movement_type_id',
    }),
    addColumn({
      title: 'Status',
      render: (_, { status }) => <TaggedStatus status={status} />,
    }),
    addColumn({
      title: 'Action',
      render: (_, { id }) => (
        <Button
          size="big"
          variant="tertiary"
          onClick={() => router.push(`${PATH.LOGISTIC}/goods-issue-intra-sloc/detail/${id}`)}
        >
          View Detail
        </Button>
      ),
    }),
  ]
}
