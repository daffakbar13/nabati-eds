import React from 'react'
import { Loader } from 'src/components'
import { useSalesShipmentCreateContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useSalesShipmentCreateContext()

  return <>{processing && <Loader type="process" text={processing} />}</>
}
