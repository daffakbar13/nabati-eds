/* eslint-disable object-curly-newline */
import React from 'react'
import { useSalesSalesmanDivisionContext } from '../states'
import { ConfirmDelete, ConfirmSuccessCancel } from './alerts'
import ConfirmSuccessDelete from './alerts/confirmSuccessDelete'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSalesSalesmanDivisionContext()

  return (
    <>
      {confirm === 'delete' && <ConfirmDelete />}
      {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
      {confirm === 'success-delete' && <ConfirmSuccessDelete />}
    </>
  )
}
