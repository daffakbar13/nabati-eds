import React from 'react'
import { useSalesSalesOrderCreateContext } from 'src/hooks/contexts'
import { ConfirmCancel, ConfirmSuccessSubmit } from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm, tableProduct },
  } = useSalesSalesOrderCreateContext()

  return (
    <>
      {(confirm === 'draftQuo' || confirm === 'newQuo') && <ConfirmSuccessSubmit />}
      {confirm === 'cancel' && <ConfirmCancel />}
      {<tableProduct.ConfirmDelete />}
    </>
  )
}
