/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import TaggedStatus from 'src/components/TaggedStatus'

interface LinkedProps {
  link: string
  status: string
  type: 'id' | 'action'
  page: string
  limit: string
}

function Action({ link }: { link: string }) {
  const router = useRouter()
  const navigate = () => {
    router.push(`/sales/approval-noo/detail/${link}`)
  }
  const [hover, setHover] = React.useState(false)

  return (
    <Button size="big" variant="tertiary" onClick={navigate}>
      View Detail
    </Button>
  )
}

export const useColumnApproval = [
  CreateColumns('No', '', false, (text: string, rec, index) => <>{index + 1}</>, 70, 'left'),
  CreateColumns('ID', 'customer_id', true),
  CreateColumns('Name', 'customer_name'),
  CreateColumns(
    'Sales Org',
    'sales_org_id',
    false,
    (text: string, record: any) => `${record.sales_org_id || ''} - ${record.sales_org_name || ''}`,
  ),
  CreateColumns(
    'Sales Group',
    'sales_group_id',
    false,
    (text: string, record: any) =>
      `${record.sales_group_id || ''} - ${record.sales_group_name || ''}`,
  ),
  CreateColumns(
    'Branch',
    'branch_id',
    false,
    (text: string, record: any) => `${record.branch_id || ''} - ${record.branch_name || ''}`,
  ),
  CreateColumns(
    'Channel',
    'channel_id',
    false,
    (text: string, record: any) => `${record.channel_id || ''} - ${record.channel_name || ''}`,
  ),
  CreateColumns(
    'Customer Group',
    'customer_group_id',
    false,
    (text: string, record: any) =>
      `${record.customer_group_id || ''} - ${record.customer_group_name || ''}`,
  ),
  CreateColumns('Status', 'status_name', false, (status_name) => (
    <TaggedStatus status={status_name} />
  )),
  CreateColumns('Action', 'customer_id', false, (link: string) => <Action link={link} />),
]
