import { addColumn } from 'src/utils/createColumns'
import { Button } from 'pink-lava-ui'
import dateFormat from 'src/utils/dateFormat'

export const columns = (onClickDetail: (rec: any) => void) => [
  addColumn({
    title: 'No',
    render: (text, record, index) => index + 1,
    width: 55,
  }),
  addColumn({
    title: 'Country',
    dataIndex: 'company_id',
    render: (text, record, index) => '-',
  }),
  addColumn({
    title: 'Company',
    dataIndex: 'company_id',
    render: (text, record, index) => `${text || ''} - ${record.company_name || ''}`,
  }),
  addColumn({
    title: 'Tax Subject',
    dataIndex: 'tax_subject',
  }),
  addColumn({
    title: 'Tax CL Material',
    dataIndex: 'tax_cl_material',
  }),
  addColumn({
    title: 'Tax Name',
    dataIndex: 'tax_name',
  }),
  addColumn({
    title: 'Amount',
    dataIndex: 'amount',
    render: (text, record, index) => `${text || 0}%`,
  }),
  addColumn({
    title: 'Valid From',
    dataIndex: 'valid_from',
    render: (text, record, index) => dateFormat(text, true),
  }),
  addColumn({
    title: 'Valid To',
    dataIndex: 'valid_to',
    render: (text, record, index) => dateFormat(text, true),
  }),
  addColumn({
    title: 'Action',
    render: (text, record, index) => (
      <Button size="big" variant="tertiary" onClick={() => onClickDetail(record)}>
        View Detail
      </Button>
    ),
  }),
]
