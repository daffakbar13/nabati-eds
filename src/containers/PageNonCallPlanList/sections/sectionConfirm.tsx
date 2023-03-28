/* eslint-disable object-curly-newline */
import React from 'react'
import { useSFANonCallPlanListContext } from '../states'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessCancel, ConfirmSuccessSubmit } from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSFANonCallPlanListContext()

  return (
    <>
      {confirm === 'submit' && <ConfirmSubmit />}
      {confirm === 'success-submit' && <ConfirmSuccessSubmit />}
      {confirm === 'cancel' && <ConfirmCancel />}
      {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </>
  )
}
