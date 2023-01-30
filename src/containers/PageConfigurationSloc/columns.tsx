import { addColumn } from 'src/utils/createColumns'
import { Button, Switch } from 'pink-lava-ui'

export const columns = (goToDetail: (a: any) => void) => [
  addColumn({
    title: 'Branch',
    dataIndex: 'branch',
  }),
  addColumn({
    title: 'Sloc ID',
    dataIndex: 'sloc_id',
  }),
  addColumn({
    title: 'Sloc Function',
    dataIndex: 'sloc_function',
  }),
  addColumn({
    title: 'Sloc Type',
    dataIndex: 'sloc_type',
    render: (text: string, record: any, index: number) => (text === 'C' ? 'Canvas' : 'Intra Sloc'),
  }),
  addColumn({
    title: 'Action',
    dataIndex: 'action',
    render: (text: string, record: any) => (
      <>
        {text != '' ? (
          <Button size="big" variant="tertiary" onClick={() => goToDetail(record)}>
            View Detail
          </Button>
        ) : (
          ''
        )}
      </>
    ),
  }),
]
