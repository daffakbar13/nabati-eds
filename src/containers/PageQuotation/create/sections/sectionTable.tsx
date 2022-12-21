import React from 'react'
import { useSalesQuotationCreateContext } from 'src/hooks/contexts'
import { TableProduct } from 'src/components'

export default function SectionTable() {
  const {
    state: {
      dataForm,
      tableProduct: { state, handler },
    },
  } = useSalesQuotationCreateContext()

  return (
    <TableProduct state={state} handler={handler} hideData={dataForm.customer_id === undefined} />
  )
}
