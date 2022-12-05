import React from 'react'
import { useSalesQuotationCreateContext } from 'src/hooks/contexts'
import { useTableProduct } from '../columns'
import { ConfirmCancel, ConfirmSuccessSubmit } from './alerts'

export default function SectionConfirm() {
  const pageCtx = useSalesQuotationCreateContext<typeof useTableProduct>()
  return (
    <pageCtx.getConsumer>
      {({ state }) => {
        const { newQuotation, draftQuotation, cancel, tableProduct } = state

        return (
          <>
            {(newQuotation || draftQuotation) && <ConfirmSuccessSubmit />}
            {cancel && <ConfirmCancel />}
            {<tableProduct.ConfirmDelete />}
          </>
        )
      }}
    </pageCtx.getConsumer>
  )
}
