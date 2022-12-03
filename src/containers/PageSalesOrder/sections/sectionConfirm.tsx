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
  const [submittedSalesOrder, setSubmittedSalesOrder] = React.useState([])

  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]
  const selectedSalesOrder = {
    text: oneSelected ? firstSelected : `${firstSelected}, +${table.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.selected.join(', ')}</div>,
  }

  return (
    <>
      {showConfirm === 'submit' && (
        <ConfirmSubmit
          handleProcess={handleProcess}
          handleShowConfirm={handleShowConfirm}
          handleSubmittedSalesOrder={setSubmittedSalesOrder}
          table={table}
          selectedSalesOrder={selectedSalesOrder}
        />
      )}
      {showConfirm === 'success-submit' && (
        <ConfirmSuccessSubmit submittedSalesOrder={submittedSalesOrder} table={table} />
      )}
      {showConfirm === 'cancel' && (
        <ConfirmCancel
          handleProcess={handleProcess}
          handleShowConfirm={handleShowConfirm}
          table={table}
        />
      )}
      {showConfirm === 'success-cancel' && (
        <ConfirmSuccessCancel selectedSalesOrder={selectedSalesOrder} table={table} />
      )}
    </>
  )
}
