import React from 'react'
import { Loader } from 'src/components'
import { SalesQuotationListCtx } from '../states'

export default function SectionLoader() {
  return (
    <SalesQuotationListCtx.Consumer>
      {({ state }) => {
        const { processing } = state
        return <>{processing && <Loader type="process" text={processing} />}</>
      }}
    </SalesQuotationListCtx.Consumer>
  )
}
