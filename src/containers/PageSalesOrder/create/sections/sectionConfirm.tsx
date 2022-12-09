import React from 'react'
import { useSalesSalesOrderCreateContext } from 'src/hooks/contexts'
import { ConfirmCancel, ConfirmSuccessSubmit } from './alerts'

export default function SectionConfirm() {
  const {
    state: { newSalesOrder, draftSalesOrder, cancel, tableProduct },
  } = useSalesSalesOrderCreateContext()

  return (
    <>
      {(newSalesOrder || draftSalesOrder) && <ConfirmSuccessSubmit />}
      {cancel && <ConfirmCancel />}
      {<tableProduct.ConfirmDelete />}
    </>
  )
}
