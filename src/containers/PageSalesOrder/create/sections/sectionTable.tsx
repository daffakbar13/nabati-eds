import React from 'react'
import { useSalesSalesOrderCreateContext } from 'src/hooks/contexts'
import { TableProduct } from 'src/components'

export default function SectionTable() {
  const {
    state: { dataForm, tableProduct },
  } = useSalesSalesOrderCreateContext()
  const [orderTypeId] = dataForm.order_type_id.split(' - ')

  return (
    <TableProduct
      TableProps={tableProduct}
      hideData={dataForm.customer_id === undefined}
      withDiscount={['ZRE1', 'ZRE2', 'ZRE3', 'ZWE1'].includes(orderTypeId)}
    />
  )
}
