import React from 'react'
import { Loader } from 'src/components'
import { useSalesQuotationListContext } from 'src/hooks/contexts'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useSalesQuotationListContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
