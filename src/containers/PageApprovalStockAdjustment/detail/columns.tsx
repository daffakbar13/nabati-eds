import { addColumn } from 'src/utils/createColumns'

export const columns = [
  addColumn({
    title: 'No',
    dataIndex: 'id',
    render: (text: string, record: any, index) => index + 1,
    width: 70,
    fixed: true,
  }),
  addColumn({
    title: 'Item',
    dataIndex: 'product_id',
    width: 350,
    render: (text: string, record: any, index) => `${text} - ${record.product_name}`,
  }),
  addColumn({
    title: 'Stock Quantity',
    dataIndex: 'stock quanitity',
    width: 400,
    children: [
      {
        title: 'Large',
        dataIndex: 'large',
        render: (text: string, record: any, index) => `${record.stock_unit.large}`,
        width: 100,
        align: 'center',
      },
      {
        title: 'Middle',
        dataIndex: 'middle',
        render: (text: string, record: any, index) => `${record.stock_unit.middle}`,
        width: 100,
        align: 'center',
      },
      {
        title: 'Small',
        dataIndex: 'small',
        render: (text: string, record: any, index) => `${record.stock_unit.small}`,
        width: 100,
        align: 'center',
      },
    ],
  }),
  addColumn({
    title: 'Actual Quantity',
    dataIndex: 'actial quantity',
    width: 400,
    children: [
      {
        title: 'Large',
        dataIndex: 'large',
        render: (text: string, record: any, index) => `${record.qty_unit.large}`,
        width: 100,
        align: 'center',
      },
      {
        title: 'Middle',
        dataIndex: 'middle',
        render: (text: string, record: any, index) => `${record.qty_unit.middle}`,
        width: 100,
        align: 'center',
      },
      {
        title: 'Small',
        dataIndex: 'small',
        render: (text: string, record: any, index) => `${record.qty_unit.small}`,
        width: 100,
        align: 'center',
      },
    ],
  }),
  addColumn({
    title: 'Adjustment Quantity',
    dataIndex: 'reference quantity',
    width: 400,
    children: [
      {
        title: 'Large',
        dataIndex: 'large',
        render: (text: string, record: any, index) => `${record.different_unit.large}`,
        width: 100,
        align: 'center',
      },
      {
        title: 'Middle',
        dataIndex: 'middle',
        render: (text: string, record: any, index) => `${record.different_unit.middle}`,
        width: 100,
        align: 'center',
      },
      {
        title: 'Small',
        dataIndex: 'small',
        render: (text: string, record: any, index) => `${record.different_unit.small}`,
        width: 100,
        align: 'center',
      },
    ],
  }),
  addColumn({
    title: 'Movement Type',
    dataIndex: 'movement_type_id',
    render: (text: string, record: any, index) => `${text} - ${record.movement_type_name}`,
    width: 200,
  }),
]
