import React from 'react'
import { TableProduct } from 'src/components'
import { useSalesQuotationCreateContext } from '../states'

export default function SectionTable() {
  const {
    state: { dataForm, tableProduct },
  } = useSalesQuotationCreateContext()
  const [orderTypeId] = dataForm.order_type_id.split(' - ')

  return (
    <TableProduct
      TableProps={tableProduct}
      hideData={dataForm.customer_id === undefined}
      withDiscount={['ZQR1', 'ZQW1'].includes(orderTypeId)}
    />
  )
}
