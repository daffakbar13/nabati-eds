import React from 'react'
import { useTableProduct } from '../columns'
import { ConfirmCancel, ConfirmSuccessSubmit } from './confirms'

interface SectionConfirmProps {
  newSalesOrder: string
  draftSalesOrder: string
  cancel: boolean
  handleCancel: (cancel: boolean) => void
  tableProduct: ReturnType<typeof useTableProduct>
}

export default function SectionConfirm(props: SectionConfirmProps) {
  const { newSalesOrder, draftSalesOrder, cancel, handleCancel, tableProduct } = props

  return (
    <>
      {(newSalesOrder || draftSalesOrder) && (
        <ConfirmSuccessSubmit draftSalesOrder={draftSalesOrder} newSalesOrder={newSalesOrder} />
      )}
      {cancel && <ConfirmCancel handleCancel={handleCancel} />}
      {<tableProduct.ConfirmDelete />}
    </>
  )
}
