import React from 'react'
import { Loader } from 'src/components'
import { useSalesSalesmanDivisionContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useSalesSalesmanDivisionContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
