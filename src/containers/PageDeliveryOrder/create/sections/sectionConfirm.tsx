import React from 'react'
import { useTableProduct } from '../columns'
import { ConfirmCancel, ConfirmSuccessSubmit } from './alerts'

interface SectionConfirmProps {
  newDeliveryOrder: string
  draftDeliveryOrder: string
  cancel: boolean
  handleCancel: (cancel: boolean) => void
  tableProduct: ReturnType<typeof useTableProduct>
}

export default function SectionConfirm(props: SectionConfirmProps) {
  const { newDeliveryOrder, draftDeliveryOrder, cancel, handleCancel, tableProduct } = props

  return (
    <>
      {(newDeliveryOrder || draftDeliveryOrder) && (
        <ConfirmSuccessSubmit
          draftDeliveryOrder={draftDeliveryOrder}
          newDeliveryOrder={newDeliveryOrder}
        />
      )}
      {cancel && <ConfirmCancel handleCancel={handleCancel} />}
      {<tableProduct.ConfirmDelete />}
    </>
  )
}
