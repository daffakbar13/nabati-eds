/* eslint-disable object-curly-newline */
import React from 'react'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessCancel, ConfirmSuccessSubmit } from './alerts'
import { SalesQuotationListCtx } from '../states'

export default function SectionConfirm() {
  return (
    <SalesQuotationListCtx.Consumer>
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
    </SalesQuotationListCtx.Consumer>
  )
}
