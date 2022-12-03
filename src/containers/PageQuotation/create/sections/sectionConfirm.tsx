import React from 'react'
import { useTableProduct } from '../columns'
import { ConfirmCancel, ConfirmSuccessSubmit } from './alerts'

interface SectionConfirmProps {
  newQuotation: string
  draftQuotation: string
  cancel: boolean
  handleCancel: (cancel: boolean) => void
  tableProduct: ReturnType<typeof useTableProduct>
}

export default function SectionConfirm(props: SectionConfirmProps) {
  const { newQuotation, draftQuotation, cancel, handleCancel, tableProduct } = props

  return (
    <>
      {(newQuotation || draftQuotation) && (
        <ConfirmSuccessSubmit draftQuotation={draftQuotation} newQuotation={newQuotation} />
      )}
      {cancel && <ConfirmCancel handleCancel={handleCancel} />}
      {<tableProduct.ConfirmDelete />}
    </>
  )
}
