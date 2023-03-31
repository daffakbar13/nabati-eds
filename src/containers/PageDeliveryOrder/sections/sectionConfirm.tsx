/* eslint-disable object-curly-newline */
import React from 'react'
import { useTable } from 'src/hooks'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessCancel, ConfirmSuccessSubmit } from './alerts'

interface SectionConfirmProps {
  table: ReturnType<typeof useTable>
  handleProcess: (process: string) => void
  showConfirm: string
  handleShowConfirm: (confirm: string) => void
}

export default function SectionConfirm(props: SectionConfirmProps) {
  const { table, handleProcess, showConfirm, handleShowConfirm } = props
  const [submittedDeliveryOrder, setSubmittedDeliveryOrder] = React.useState([])

  const oneSelected = table.state.selected.length === 1
  const firstSelected = table.state.selected[0]
  const selectedDeliveryOrder = {
    text: oneSelected
      ? firstSelected
      : `${firstSelected}, +${table.state.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.state.selected.join(', ')}</div>,
  }

  return (
    <>
      {showConfirm === 'submit' && (
        <ConfirmSubmit
          handleProcess={handleProcess}
          handleShowConfirm={handleShowConfirm}
          handleSubmittedDeliveryOrder={setSubmittedDeliveryOrder}
          table={table}
          selectedDeliveryOrder={selectedDeliveryOrder}
        />
      )}
      {showConfirm === 'success-submit' && (
        <ConfirmSuccessSubmit submittedDeliveryOrder={submittedDeliveryOrder} table={table} />
      )}
      {showConfirm === 'cancel' && (
        <ConfirmCancel
          handleProcess={handleProcess}
          handleShowConfirm={handleShowConfirm}
          table={table}
        />
      )}
      {showConfirm === 'success-cancel' && (
        <ConfirmSuccessCancel selectedDeliveryOrder={selectedDeliveryOrder} table={table} />
      )}
    </>
  )
}
