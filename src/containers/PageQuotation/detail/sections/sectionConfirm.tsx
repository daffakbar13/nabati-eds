import React from 'react'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { ConfirmCancel, ConfirmSuccessCancel, ConfirmSuccessSubmit } from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSalesQuotationDetailContext()

  return (
    <>
      {confirm === 'cancel' && <ConfirmCancel />}
      {confirm === 'success-submit' && <ConfirmSuccessSubmit />}
      {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </>
  )
}
