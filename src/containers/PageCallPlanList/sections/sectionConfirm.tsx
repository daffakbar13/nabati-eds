/* eslint-disable object-curly-newline */
import React from 'react'
import { useSFACallPlanListContext } from '../states'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessCancel, ConfirmSuccessSubmit } from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSFACallPlanListContext()

  return (
    <>
      {confirm === 'submit' && <ConfirmSubmit />}
      {confirm === 'success-submit' && <ConfirmSuccessSubmit />}
      {confirm === 'cancel' && <ConfirmCancel />}
      {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </>
  )
}
