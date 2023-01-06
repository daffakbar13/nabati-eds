import { addColumn } from 'src/utils/createColumns'
import { Button } from 'pink-lava-ui'

export const TableQuotation = [
  addColumn({
    title: 'Customer',
    dataIndex: 'customer_id',
    fixed: true,
  }),
  addColumn({
    title: 'Term of Payment',
    dataIndex: 'term_of_payment',
  }),
  addColumn({
    title: 'Transaction Type',
    dataIndex: 'transaction_type',
  }),
  addColumn({
    title: 'Billing Number',
    dataIndex: 'billing_number',
  }),
  addColumn({
    title: 'Billing Amount',
    dataIndex: 'billing_amount',
  }),
  addColumn({
    title: 'Paid Amount',
    dataIndex: 'paid_amount',
  }),
  addColumn({
    title: 'Payment Method',
    dataIndex: 'payment_method',
  }),
  addColumn({
    title: 'Balance',
    dataIndex: 'balance',
  }),
  addColumn({
    title: 'Undelivered Reason',
    dataIndex: 'undelivered_Reason',
  }),
  addColumn({
    title: 'Action',
    render: () => (
      <div style={{ display: 'flex', gap: 5 }}>
        <Button variant="primary" size="small">
          Delivered
        </Button>
        <Button variant="tertiary" size="small">
          Undelivered
        </Button>
      </div>
    ),
  }),
]
