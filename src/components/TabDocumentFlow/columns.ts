import { addColumn } from 'src/utils/createColumns'

const createData = (title: string, dataIndex: string) => ({ title, dataIndex })

export const useColumnsDocumentFlow = [
  addColumn({
    title: 'Process',
    dataIndex: 'doc_category_name',
  }),
  addColumn({
    title: 'Doc. Number',
    dataIndex: 'document_id',
  }),
  addColumn({
    title: 'Created Date',
    dataIndex: 'created_at',
  }),
  addColumn({
    title: 'Created By',
    dataIndex: 'created_by',
  }),
  addColumn({
    title: 'Modified Date',
    dataIndex: 'modified_at',
  }),
  addColumn({
    title: 'Modified By',
    dataIndex: 'modified_by',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status_name',
  }),
]
