import React from 'react'
import { Modal, Button, Row } from 'pink-lava-ui'
import SmartFilter from 'src/components/SmartFilter'
import { FilterOption } from 'src/configs/filterType'

const defaultFilterOptions: FilterOption[] = [
  {
    fields: 'sales_org',
    label: 'Sales Organization',
    option: 'LE',
    dataType: 'S',
  },
  {
    fields: 'branch',
    label: 'Branch',
    option: 'EQ',
    dataType: 'S',
  },
  {
    fields: 'sold_to_customer',
    label: 'Sold to Customer',
    option: 'LE',
    dataType: 'S',
  },
  {
    fields: 'ship_to_customer',
    label: 'Ship to Customer',
    option: 'LT',
    dataType: 'S',
  },
  {
    fields: 'order_type',
    label: 'Order type',
    option: 'GT',
    dataType: 'S',
  },
  {
    fields: 'order_date',
    label: 'Order Date',
    option: 'GE',
    dataType: 'S',
  },
]

function HeadFilterModal({ visible, title, onOk, onCancel }) {
  return (
    <Modal
      visible={visible}
      title={title}
      // onOk={onOk}
      onCancel={onCancel}
      width={880}
      footer={
        <Row gap="16px" reverse>
          <Button>Apply</Button>
          <Button variant="tertiary" onClick={onCancel}>
            Clear All
          </Button>
        </Row>
      }
      content={<SmartFilter defaultOptions={defaultFilterOptions} onChange={onOk} />}
    />
  )
}

export default HeadFilterModal
