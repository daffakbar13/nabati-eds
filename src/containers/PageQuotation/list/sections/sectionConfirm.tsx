/* eslint-disable object-curly-newline */
import React from 'react'
import { useSalesQuotationListContext } from 'src/hooks/contexts'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessCancel, ConfirmSuccessSubmit } from './alerts'

export default function SectionConfirm() {
  const pageCtx = useSalesQuotationListContext()

  return (
    <pageCtx.getConsumer>
      {({ state }) => {
        const { confirm } = state

        return (
          <>
            {confirm === 'submit' && <ConfirmSubmit />}
            {confirm === 'success-submit' && <ConfirmSuccessSubmit />}
            {confirm === 'cancel' && <ConfirmCancel />}
            {confirm === 'success-cancel' && <ConfirmSuccessCancel />}
          </>
        )
      }}
    </pageCtx.getConsumer>
  )
}
