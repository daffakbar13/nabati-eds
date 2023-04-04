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
      dataIndex: 'customer_id',
      sorter: true,
    }),
    addColumn({
      title: 'Customer Name',
      dataIndex: 'customer_name',
      sorter: true,
    }),
    addColumn({
      title: 'Day',
      dataIndex: 'calendar_day_name',
    }),
    addColumn({
      title: 'Date',
      dataIndex: 'visit_date',
    }),
    addColumn({
      title: 'Status',
      render: () => <TaggedStatus status="Generate" />,
    }),
    addColumn({
      title: 'Week ID',
      dataIndex: 'calendar_week',
    }),
    addColumn({
      title: 'Week In Period',
      dataIndex: 'calendar_week_in_month',
    }),
    addColumn({
      title: 'Call Pattern',
      render: () => 'Call Plan',
    }),
  ]
}
