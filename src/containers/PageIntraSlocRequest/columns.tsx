import { addColumn } from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'
import Link from 'src/components/Link'
import { concatString } from 'src/utils/concatString'

export function useColumnRequestIntraSloc() {
  const router = useRouter()
  function navigateToDetail(id: string) {
    router.push(`${PATH.LOGISTIC}/request-intra-sloc/detail/${id}`)
  }
  return [
    addColumn({
      title: 'Request Number',
      render: (_, { id }) => <Link onClick={() => navigateToDetail(id)}>{id}</Link>,
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
      render: (_, { suppl_branch_id, supply_branch_name }) =>
        concatString(suppl_branch_id, supply_branch_name),
    }),
    addColumn({
      title: 'From Sloc',
      render: (_, { suppl_sloc_id, suppl_sloc_name }) =>
        concatString(suppl_sloc_id, suppl_sloc_name),
    }),
    addColumn({
      title: 'To Sloc',
      render: (_, { receive_sloc_id, receive_sloc_name }) =>
        concatString(receive_sloc_id, receive_sloc_name),
    }),
    addColumn({
      title: 'Status',
      render: (_, { status }) => <TaggedStatus status={status} />,
    }),
    addColumn({
      title: 'Action',
      render: (_, { id }) => (
        <Button variant="tertiary" onClick={() => navigateToDetail(id)}>
          View Detail
        </Button>
      ),
    }),
  ]
}
