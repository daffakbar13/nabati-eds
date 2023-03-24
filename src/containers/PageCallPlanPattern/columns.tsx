import { addColumn } from 'src/utils/createColumns'
import { concatString } from 'src/utils/concatString'
import { Switch } from 'pink-lava-ui'

export function useColumnQuotation() {
  return [
    addColumn({
      title: 'No',
      render: (_, __, i) => i + 1,
      fixed: true,
    }),
    addColumn({
      title: 'Salesman ID',
      render: (_, { salesman_id, salesman_name }) => concatString(salesman_id, salesman_name),
      sorter: true,
    }),
    addColumn({
      title: 'Customer ID',
      dataIndex: 'sold_to_customer_id',
      render: (id, { customer_name }) => concatString(id, customer_name),
      sorter: true,
    }),
    addColumn({
      title: 'Company ID',
      render: (_, { branch_id, branch_name }) => concatString(branch_id, branch_name),
      sorter: true,
    }),
    addColumn({
      title: 'Branch ID',
      render: (_, { branch_id, branch_name }) => concatString(branch_id, branch_name),
      sorter: true,
    }),
    addColumn({
      title: 'Cycle',
      render: () => 'M1',
    }),
    addColumn({
      title: 'Visit Day',
      render: () => 'Monday',
    }),
    addColumn({
      title: 'Week 1',
      render: () => '1',
    }),
    addColumn({
      title: 'Week 2',
      render: () => '2',
    }),
    addColumn({
      title: 'Week 3',
      render: () => '3',
    }),
    addColumn({
      title: 'Week 4',
      render: () => '4',
    }),
    addColumn({
      title: 'Active/Inactive',
      render: () => <Switch />,
    }),
  ]
}
