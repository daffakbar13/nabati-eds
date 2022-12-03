/* eslint-disable object-curly-newline */
import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button, Text } from 'pink-lava-ui'
import { cancelBatchOrder, multipleSubmitQuotation } from 'src/api/quotation'
import { useTable } from 'src/hooks'
import { CheckCircleFilled } from '@ant-design/icons'
import DebounceSelect from 'src/components/DebounceSelect'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { fieldReason } from 'src/configs/fieldFetches'
import {
  ConfirmCancel,
  ConfirmSubmit,
  ConfirmSuccessCancel,
  ConfirmSuccessSubmit,
} from './confirms'

interface SectionConfirmProps {
  table: ReturnType<typeof useTable>
  handleProcess: (process: string) => void
  showConfirm: string
  handleShowConfirm: (confirm: string) => void
}

export default function SectionConfirm(props: SectionConfirmProps) {
  const { table, handleProcess, showConfirm, handleShowConfirm } = props
  const [submittedQuotation, setSubmittedQuotation] = React.useState([])

  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]
  const selectedQuotation = {
    text: oneSelected ? firstSelected : `${firstSelected}, +${table.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.selected.join(', ')}</div>,
  }

  return (
    <>
      {showConfirm === 'submit' && (
        <ConfirmSubmit
          handleProcess={handleProcess}
          handleShowConfirm={handleShowConfirm}
          handleSubmittedQuotation={setSubmittedQuotation}
          table={table}
          selectedQuotation={selectedQuotation}
        />
      )}
      {showConfirm === 'success-submit' && (
        <ConfirmSuccessSubmit submittedQuotation={submittedQuotation} table={table} />
      )}
      {showConfirm === 'cancel' && (
        <ConfirmCancel
          handleProcess={handleProcess}
          handleShowConfirm={handleShowConfirm}
          table={table}
        />
      )}
      {showConfirm === 'success-cancel' && (
        <ConfirmSuccessCancel selectedQuotation={selectedQuotation} table={table} />
      )}
    </>
  )
}
