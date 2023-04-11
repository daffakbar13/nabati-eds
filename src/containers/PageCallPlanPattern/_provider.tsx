import React from 'react'
import { callPlanPatternList } from 'src/api/call-plan-pattern'
import useTable from 'src/hooks/useTable/index'
import { useColumnCallPlanPattern } from './columns'
import { useSFACallPlanPatternProvider } from './states'

export default function SFACallPlanPatternProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const SFACallPlanPattern = useSFACallPlanPatternProvider()
  const table = useTable({
    funcApi: callPlanPatternList,
    // haveCheckBox: [{ rowKey: 'status_name', member: ['New'] }],
    columns: useColumnCallPlanPattern(SFACallPlanPattern.handler),
  })

  return (
    <SFACallPlanPattern.Provider
      value={{
        state: {
          ...SFACallPlanPattern.state,
          table,
        },
        handler: SFACallPlanPattern.handler,
      }}
    >
      {children}
    </SFACallPlanPattern.Provider>
  )
}
