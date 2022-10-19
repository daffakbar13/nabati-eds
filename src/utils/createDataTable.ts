type TableType ='list'|'basic'

type DataTableList = [
    title:string,
    dataIndex:string
]

export default function CreateDataTable(
  type: TableType,
  data:DataTableList[],
) {
  const newData = data.map((e) => ({ key: e[1], title: e[0], dataIndex: e[1] }))
  switch (type) {
    case 'list':
      return [
        { key: 'checkbox', title: '', dataIndex: 'checkbox' },
        ...newData,
        { key: 'action', title: 'Action', dataIndex: 'action' },
      ]

    default:
      return newData
  }
}