import { addColumn } from 'src/utils/createColumns'
import TaggedStatus from 'src/components/TaggedStatus'

export function useColumnNonCallPlanList() {
  return [
    addColumn({
      title: 'No',
      render: (_, __, i) => i + 1,
      fixed: true,
    }),
    addColumn({
      title: 'Company ID',
      dataIndex: 'company_id',
      render: (_, { company_id }) => company_id,
    }),
    addColumn({
      title: 'Customer ID',
      dataIndex: 'customer_id',
      render: (_, { customer_id }) => customer_id,
    }),
    addColumn({
      title: 'Salesman ID',
      dataIndex: 'salesman_id',
      render: (_, { salesman_id }) => salesman_id,
    }),
    addColumn({
      title: 'Visit Date',
      dataIndex: 'visit_date',
      //render: (_, { visit_date }) => visit_date,
    }),
    addColumn({
      title: 'Generate Date',
      dataIndex: 'generate_date',
      //render: (_, { generate_date }) => generate_date,
      //render: () => <TaggedStatus status="Generate" />,
      sorter: true,
    }),
    addColumn({
      title: 'Customer Name',
      dataIndex: 'customer_name',
      //title: 'Status',
      //render: () => <TaggedStatus status="Generate" />,
    }),
    addColumn({
      title: 'Customer Address',
      dataIndex: 'customer_address',
      //title: 'Status',
      //render: () => <TaggedStatus status="Generate" />,
    }),
    addColumn({
      title: 'Salesman Name',
      dataIndex: 'salesman_name',
      //render: () => '1',
    }),
    addColumn({
      title: 'Calendar Week',
      dataIndex: 'calendar_week',
      //render: () => '1',
    }),
    addColumn({
      title: 'Calendar Week Int',
      dataIndex: 'calendar_week_int',
    }),
    addColumn({
      title: 'Calendar Week In Month',
      dataIndex: 'calendar_week_in_month',
    }),
    addColumn({
      title: 'Calendar Month',
      dataIndex: 'calendar_month',
    }),
    addColumn({
      title: 'Calendar Day Name',
      dataIndex: 'calendar_day_name',
    }),
  ]
}
