import React from 'react'
import { useSalesSalesOrderCreateContext } from 'src/hooks/contexts'
import { ConfirmCancel, ConfirmSuccessSubmit } from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSalesSalesOrderCreateContext()

  return (
    <>
      {(confirm === 'newSO' || confirm === 'draftSO') && <ConfirmSuccessSubmit />}
      {confirm === 'cancel' && <ConfirmCancel />}
    </>
  )
}
