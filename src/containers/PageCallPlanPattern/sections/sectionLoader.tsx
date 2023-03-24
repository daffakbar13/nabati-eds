import React from 'react'
import { Loader } from 'src/components'
import { useSalesQuotationListContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useSalesQuotationListContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
