import React from 'react'
import { Loader } from 'src/components'
import { useSalesSalesOrderDetailContext } from 'src/hooks/contexts'

export default function SectionLoader() {
  const {
    state: { processing, data },
  } = useSalesSalesOrderDetailContext()
  const hasData = Object.keys(data).length > 0

  return (
    <>
      {!hasData && <Loader type="process" text="Wait for get data" />}
      {processing && <Loader type="process" text={processing} />}
    </>
  )
}
