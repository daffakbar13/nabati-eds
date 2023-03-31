/* eslint-disable object-curly-newline */
import React from 'react'
import { useSalesSalesmanDivisionContext } from '../states'
import {
  ConfirmActivation,
  ConfirmDelete,
  ConfirmSuccessActivation,
  ConfirmSuccessDelete,
} from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSalesSalesmanDivisionContext()

  return (
    <>
      {confirm === 'delete' && <ConfirmDelete />}
      {confirm === 'activation' && <ConfirmActivation />}
      {confirm === 'success-delete' && <ConfirmSuccessDelete />}
      {confirm === 'success-activation' && <ConfirmSuccessActivation />}
    </>
  )
}
