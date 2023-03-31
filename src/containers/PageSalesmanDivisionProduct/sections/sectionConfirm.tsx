import React from 'react'
import { useSalesSalesmanDivisionContext } from '../states'
import {
  ConfirmActivation,
  ConfirmDelete,
  ConfirmSubmit,
  ConfirmSuccessActivation,
  ConfirmSuccessDelete,
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
      {confirm === 'success-delete' && <ConfirmSuccessDelete />}
      {confirm === 'activation' && <ConfirmActivation />}
      {confirm === 'success-activation' && <ConfirmSuccessActivation />}
    </>
  )
}
