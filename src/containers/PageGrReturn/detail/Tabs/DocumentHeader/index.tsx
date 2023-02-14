import { Table } from 'pink-lava-ui'
import moment from 'moment'
import List from 'src/components/List'
import { toTitleCase } from 'src/utils/caseConverter'

import { columns } from '../../columns'

const DATE_FORMAT = 'DD-MMM-YYYY'
export default function DocumentHeader({ details, loading = false }) {
  return (
    <>
      <List loading={loading}>
        <List.Item
          label="Mov. Type"
          value={`${details?.movement_type_id}-${toTitleCase(details?.movement_type_name)}`}
        />
        <List.Item
          label="Branch"
          value={`${details?.branch_id}-${toTitleCase(details?.branch_name)}`}
        />
        <List.Item
          label="Vendor"
          value={`${details?.vendor_id}-${toTitleCase(details?.vendor_name)}`}
        />
        <List.Item label="Delivery Note" value={details?.delivery_note} />
        <List.Item label="Doc Date" value={moment(details?.document_date).format(DATE_FORMAT)} />
        <List.Item label="Posting Date" value={moment(details?.posting_date).format(DATE_FORMAT)} />
        <List.Item label="Bill of Lading" value={details?.bill_of_lading} />
        <List.Item label="Header Text" value={details?.header_text} />
        <List.Item label="Created On" value={moment(details?.created_at).format(DATE_FORMAT)} />
        <List.Item label="Created By" value={details?.created_by} />
        <List.Item label="Modified On" value={details?.modified_at} />
        <List.Item label="Modified By" value={details?.modified_by} />
      </List>
      <div style={{ borderTop: '1px solid #AAAAAA', margin: '32px auto 0' }} />
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
        <Table columns={columns} dataSource={details?.items || []} />
      </div>
    </>
  )
}
