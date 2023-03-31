import React from 'react'
import { Loader } from 'src/components'
import { useSFANonCallPlanListContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useSFANonCallPlanListContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
