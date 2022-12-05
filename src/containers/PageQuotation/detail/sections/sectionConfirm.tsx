import React from 'react'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { ConfirmCancel, ConfirmSuccessCancel } from './alerts'

export default function SectionConfirm() {
  const pageCtx = useSalesQuotationDetailContext()

  return (
    <pageCtx.getConsumer>
      {({ state }) => {
        const { confirm } = state
        return (
          <>
            {confirm === 'cancel' && <ConfirmCancel />}
            {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
          </>
        )
      }}
    </pageCtx.getConsumer>
  )
}
