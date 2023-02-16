/* eslint-disable object-curly-newline */
import React from 'react'
import { useSalesSalesmanDivisionContext } from '../states'
import {
  ConfirmActivation,
  ConfirmDelete,
  ConfirmSuccessActivation,
  ConfirmSuccessCancel,
} from './alerts'
import ConfirmSuccessDelete from './alerts/confirmSuccessDelete'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSalesSalesmanDivisionContext()

  return (
    <>
      {confirm === 'delete' && <ConfirmDelete />}
      {confirm === 'activation' && <ConfirmActivation />}
      {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
      {confirm === 'success-delete' && <ConfirmSuccessDelete />}
      {confirm === 'success-activation' && <ConfirmSuccessActivation />}
    </>
  )
}
