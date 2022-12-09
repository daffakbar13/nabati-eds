import React from 'react'
import { useSalesQuotationCreateContext } from 'src/hooks/contexts'
import { useTableProduct } from '../columns'
import { ConfirmCancel, ConfirmSuccessSubmit } from './alerts'

export default function SectionConfirm() {
  const {
    state: { newQuotation, draftQuotation, cancel, tableProduct },
  } = useSalesQuotationCreateContext()

  return (
    <>
      {(newQuotation || draftQuotation) && <ConfirmSuccessSubmit />}
      {cancel && <ConfirmCancel />}
      {<tableProduct.ConfirmDelete />}
    </>
  )
}
