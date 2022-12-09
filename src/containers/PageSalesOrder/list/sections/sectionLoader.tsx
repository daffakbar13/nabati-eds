import React from 'react'
import { Loader } from 'src/components'
import { useSalesSalesOrderListContext } from 'src/hooks/contexts'

export function SectionLoader() {
  const {
    state: { processing },
  } = useSalesSalesOrderListContext()

  return <>{processing && <Loader type="process" text={processing} />}</>
}
