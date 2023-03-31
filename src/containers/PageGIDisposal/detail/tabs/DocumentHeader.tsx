import React from 'react'
import { Table } from 'pink-lava-ui'
import dateFormat from 'src/utils/dateFormat'
import List from 'src/components/List'
import { toTitleCase } from 'src/utils/caseConverter'
import { columns } from '../columns'

interface BillingProps {
  details: any
  loading: any
}

export default function DOSTO(props: BillingProps) {
  const { details } = props

  return (
    <>
      <List loading={props.loading}>
        <List.Item
          label="Reservation Number"
          value={`${details?.movement_type_id}-${toTitleCase(details?.movement_type_name)}`}
        />
        <List.Item
          label="Movement Type"
          value={`${details?.branch_id}-${toTitleCase(details?.branch_name)}`}
        />
        <List.Item
          label="Branch"
          value={`${details?.branch_id}-${toTitleCase(details?.branch_name)}`}
        />
        <List.Item label="SLoc" value={`${details?.sloc_id}-${toTitleCase(details?.sloc_name)}`} />

        <List.Item label="Requirement Date" value={dateFormat(details?.document_date)} />
        <List.Item label="Header Text" value={details?.header_text} />
        <List.Item label="" value={''} />
        <List.Item label="" value={''} />

        <List.Item label="Created On" value={dateFormat(details?.created_at)} />
        <List.Item label="Created By" value={details?.created_by} />
        <List.Item label="Modified On" value={dateFormat(details?.modified_at)} />
        <List.Item label="Modified By" value={details?.modified_by} />
      </List>
      <div style={{ borderTop: '1px solid #AAAAAA', margin: '32px auto 0' }} />
      <div style={{ overflow: 'scroll', marginTop: 16 }}>
        <Table columns={columns} dataSource={details?.item || []} />
      </div>
    </>
  )
}
