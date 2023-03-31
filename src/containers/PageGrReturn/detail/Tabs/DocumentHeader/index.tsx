import { Table, Row } from 'pink-lava-ui'
import moment from 'moment'
import { toTitleCase } from 'src/utils/caseConverter'
import { Col } from 'antd'
import { columns } from '../../columns'
import DataList from 'src/components/DataList'

const DATE_FORMAT = 'DD-MMM-YYYY'
export default function DocumentHeader({ details, loading = false }) {
  const createDataList = (label: string, value: string) => ({ label, value })
  const dataList = [
    // row 1
    createDataList('GR Number', details?.po_number || ''),
    createDataList(
      'Mov. Type',
      `${details?.movement_type_id} - ${toTitleCase(details?.movement_type_name)}`,
    ),
    createDataList('Branch', `${details?.branch_id} - ${toTitleCase(details?.branch_name)}`),
    createDataList('Vendor', `${details?.vendor_id}-${toTitleCase(details?.vendor_name)}`),
    createDataList('Delivery Note', details?.delivery_note || ''),

    // row 2
    createDataList('Doc Date', moment(details?.document_date).format(DATE_FORMAT)),
    createDataList('Posting Date', moment(details?.posting_date).format(DATE_FORMAT)),
    createDataList('Bill of Lading', details?.bill_of_lading || '-'),
    createDataList('Header Text', details?.header_text || '-'),

    // row 3
    createDataList('Created On', moment(details?.created_at).format(DATE_FORMAT)),
    createDataList('Created By', details?.created_by || '-'),
    createDataList('Modified On', moment(details?.modified_at).format(DATE_FORMAT)),
    createDataList('Modified By', details?.modified_by || '-'),
  ]
  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          {dataList.slice(0, 4).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(5, 9).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
        <Col span={8}>
          {dataList.slice(10).map(({ label, value }, i) => (
            <DataList key={i} label={label} value={value} />
          ))}
        </Col>
      </Row>
      <div style={{ borderTop: '1px solid #AAAAAA', margin: '32px auto 0' }} />
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
        <Table columns={columns} dataSource={details?.items || []} />
      </div>
    </>
  )
}
