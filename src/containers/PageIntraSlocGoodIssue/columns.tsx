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
      render: (_, { request_number }) => (
        <Link
          onClick={() =>
            router.push(`${PATH.LOGISTIC}/request-intra-sloc/detail/${request_number}`)
          }
        >
          {request_number}
        </Link>
      ),
      fixed: true,
      sorter: true,
    }),
    addColumn({
      title: 'GI Number',
      render: (_, { id, request_number }) => (
        <Link
          onClick={() =>
            router.push(
              `${PATH.LOGISTIC}/goods-issue-intra-sloc/detail/${id}?request_number=${request_number}`,
            )
          }
        >
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
      render: (_, { branch_id, branch_name }) => concatString(branch_id, branch_name),
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
      render: (_, { id, request_number }) => (
        <Button
          size="big"
          variant="tertiary"
          onClick={() =>
            router.push(
              `${PATH.LOGISTIC}/goods-issue-intra-sloc/detail/${id}?request_number=${request_number}`,
            )
          }
        >
          View Detail
        </Button>
      ),
    }),
  ]
}
