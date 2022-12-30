/* eslint-disable object-curly-newline */
import React from 'react'
import { useSalesSalesmanDivisionContext } from '../states'
import {
  ConfirmCancel,
  ConfirmDelete,
  ConfirmSubmit,
  ConfirmSuccessCancel,
  ConfirmSuccessSubmit,
} from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSalesSalesmanDivisionContext()

  return (
    <>
      {confirm === 'submit' && <ConfirmSubmit />}
      {confirm === 'delete' && <ConfirmDelete />}
      {confirm === 'success-submit' && <ConfirmSuccessSubmit />}
      {/* {confirm === 'cancel' && <ConfirmCancel />} */}
      {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </>
  )
}
