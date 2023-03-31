import React from 'react'
import { Loader } from 'src/components'
import { useSFACallPlanPatternContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useSFACallPlanPatternContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
