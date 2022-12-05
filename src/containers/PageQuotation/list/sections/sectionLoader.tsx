import React from 'react'
import { Loader } from 'src/components'
import { useSalesQuotationListContext } from 'src/hooks/contexts'

export default function SectionLoader() {
  const pageCtx = useSalesQuotationListContext()

  return (
    <pageCtx.getConsumer>
      {({ state }) => {
        const { processing } = state
        return <>{processing && <Loader type="process" text={processing} />}</>
      }}
    </pageCtx.getConsumer>
  )
}
