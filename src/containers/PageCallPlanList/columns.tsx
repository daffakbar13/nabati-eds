import { addColumn } from 'src/utils/createColumns'
import TaggedStatus from 'src/components/TaggedStatus'

export function useColumnCallPlanList() {
  return [
    addColumn({
      title: 'No',
      render: (_, __, i) => i + 1,
      fixed: true,
    }),
    addColumn({
      title: 'Salesman ID',
      dataIndex: 'salesman_id',
      sorter: true,
    }),
    addColumn({
      title: 'Salesman',
      dataIndex: 'salesman_name',
      sorter: true,
    }),
    addColumn({
      title: 'Customer ID',
      dataIndex: 'sold_to_customer_id',
      sorter: true,
    }),
    addColumn({
      title: 'Customer Name',
      dataIndex: 'customer_name',
      sorter: true,
    }),
    addColumn({
      title: 'Day',
      render: () => 'Monday',
    }),
    addColumn({
      title: 'Date',
      dataIndex: 'order_date',
    }),
    addColumn({
      title: 'Status',
      render: () => <TaggedStatus status="Generate" />,
    }),
    addColumn({
      title: 'Week ID',
      render: () => '202228',
    }),
    addColumn({
      title: 'Week In Period',
      render: () => '1',
    }),
    addColumn({
      title: 'Call Pattern',
      render: () => 'Call Plan',
    }),
  ]
}
