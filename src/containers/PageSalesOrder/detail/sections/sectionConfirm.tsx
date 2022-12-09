import React from 'react'
import { useSalesSalesOrderDetailContext } from 'src/hooks/contexts'
import { ConfirmCancel, ConfirmSuccessCancel } from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSalesSalesOrderDetailContext()

  return (
    <>
      {confirm === 'cancel' && <ConfirmCancel />}
      {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </>
  )
}
