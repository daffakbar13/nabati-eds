import React from 'react'
import { ConfirmCancel, ConfirmSuccessCancel, ConfirmSuccessSubmit } from './alerts'

interface SectionConfirmProps {
  showConfirm: string
  handleShowConfirm: (confirm: string) => void
  handleProcess: (process: string) => void
}

export default function SectionConfirm(props: SectionConfirmProps) {
  const { showConfirm, handleProcess, handleShowConfirm } = props

  return (
    <>
      {showConfirm === 'cancel' && (
        <ConfirmCancel handleProcess={handleProcess} handleShowConfirm={handleShowConfirm} />
      )}
      {showConfirm === 'success-cancel' && <ConfirmSuccessCancel />}
      {showConfirm === 'success-submit' && <ConfirmSuccessSubmit />}
    </>
  )
}
