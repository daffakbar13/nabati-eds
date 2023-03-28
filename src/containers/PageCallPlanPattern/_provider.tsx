import React from 'react'
import { getQuotation } from 'src/api/quotation'
import useTable from 'src/hooks/useTable/index'
import { useColumnCallPlanPattern } from './columns'
import { useSFACallPlanPatternProvider } from './states'

export default function SFACallPlanPatternProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const SFACallPlanPattern = useSFACallPlanPatternProvider()
  const table = useTable({
    funcApi: getQuotation,
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
