import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import TaggedStatus from 'src/components/TaggedStatus'

function Action({ link }: { link: string }) {
  const router = useRouter()
  const navigate = () => {
    router.push(`${link}`)
  }
  return (
    <h4 onClick={navigate} style={{ cursor: 'pointer' }}>
      View Detail
    </h4>
  )
}

export const TableBilling = [
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
