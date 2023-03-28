import React from 'react'
import { Loader } from 'src/components'
import { useSFACallPlanListContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useSFACallPlanListContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
