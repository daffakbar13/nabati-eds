/* eslint-disable object-curly-newline */
import React from 'react'
import { useSalesSalesOrderListContext } from 'src/hooks/contexts'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessCancel, ConfirmSuccessSubmit } from './alerts'

export function SectionConfirm() {
  const {
    state: { confirm },
  } = useSalesSalesOrderListContext()

  return (
    <>
      {confirm === 'submit' && <ConfirmSubmit />}
      {confirm === 'success-submit' && <ConfirmSuccessSubmit />}
      {confirm === 'cancel' && <ConfirmCancel />}
      {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </>
  )
}
