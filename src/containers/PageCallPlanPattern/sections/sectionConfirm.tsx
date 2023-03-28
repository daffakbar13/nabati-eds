import React from 'react'
import { useSFACallPlanPatternContext } from '../states'
import {
  ConfirmActivation,
  ConfirmCancel,
  ConfirmSubmit,
  ConfirmSuccessCancel,
  ConfirmSuccessSubmit,
} from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSFACallPlanPatternContext()

  return (
    <>
      {confirm === 'submit' && <ConfirmSubmit />}
      {confirm === 'success-submit' && <ConfirmSuccessSubmit />}
      {confirm === 'cancel' && <ConfirmCancel />}
      {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
      {confirm === 'activation' && <ConfirmActivation />}
    </>
  )
}
