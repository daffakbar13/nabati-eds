import React from 'react'
import { useSalesQuotationCreateContext } from '../states'
import { ConfirmCancel, ConfirmSuccessSubmit } from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSalesQuotationCreateContext()

  return (
    <>
      {(confirm === 'draftQuo' || confirm === 'newQuo') && <ConfirmSuccessSubmit />}
      {confirm === 'cancel' && <ConfirmCancel />}
      {/* {<tableProduct.ConfirmDelete />} */}
    </>
  )
}
