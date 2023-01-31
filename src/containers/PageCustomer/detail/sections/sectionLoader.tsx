import React from 'react'
import { Loader } from 'src/components'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'

export default function SectionLoader() {
  const {
    state: { data, processing },
  } = useSalesQuotationDetailContext()
  const hasData = data && Object.keys(data).length > 0

  return (
    <>
      {/* {!hasData && <Loader type="process" text="Wait for get data" />} */}
      {processing && <Loader type="process" text={processing} />}
    </>
  )
}
