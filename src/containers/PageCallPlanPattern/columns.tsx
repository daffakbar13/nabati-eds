import { addColumn } from 'src/utils/createColumns'
import { Switch } from 'pink-lava-ui'
import { baseHandler } from './states/handler'

export function useColumnCallPlanPattern(handler: ReturnType<typeof baseHandler>) {
  const { showConfirm, handleSelected } = handler
  function handleAction(id: string) {
    handleSelected(id)
  }
  function getDayName(dayNumber: string): string {
    switch (dayNumber) {
      case '1':
        return 'Monday'
      case '2':
        return 'Tuesday'
      case '3':
        return 'Wednesday'
      case '4':
        return 'Thursday'
      case '5':
        return 'Friday'
      case '6':
        return 'Saturday'
      case '7':
        return 'Sunday'
      default:
        return 'Invalid day number'
    }
  }

  return [
    addColumn({
      title: 'No',
      render: (_, __, i) => i + 1,
      fixed: true,
    }),
    addColumn({
      title: 'Salesman ID',
      dataIndex: 'salesman_id',
      render: (_, { salesman_id }) => salesman_id,
      sorter: true,
    }),
    addColumn({
      title: 'Customer ID',
      dataIndex: 'customer_id',
      render: (_, { customer_id }) => customer_id.replace('-', ''),
      sorter: true,
    }),
    addColumn({
      title: 'Company ID',
      dataIndex: 'company_id',
      render: (_, { company_id }) => company_id,
      sorter: true,
    }),
    addColumn({
      title: 'Branch ID',
      dataIndex: 'branch_id',
      render: (_, { branch_id }) => branch_id,
      sorter: true,
    }),
    addColumn({
      title: 'Cycle',
      dataIndex: 'cycle',
      render: (_, { cycle }) => cycle,
      sorter: true,
    }),
    addColumn({
      title: 'Visit Day',
      dataIndex: 'visit_day',
      render: (_, { visit_day }) => getDayName(visit_day),
      sorter: true,
    }),
    addColumn({
      title: 'Week 1',
      render: (_, { week_1 }) => week_1,
    }),
    addColumn({
      title: 'Week 2',
      render: (_, { week_2 }) => week_2,
    }),
    addColumn({
      title: 'Week 3',
      render: (_, { week_3 }) => week_3,
    }),
    addColumn({
      title: 'Week 4',
      render: (_, { week_4 }) => week_4,
    }),
    addColumn({
      title: 'Active/Inactive',
      render: (_, r) => (
        <Switch
          checked={r.is_active === '1'}
          onChange={() => {
            handleSelected(r)
            showConfirm('activation')
          }}
        />
      ),
    }),
  ]
}
