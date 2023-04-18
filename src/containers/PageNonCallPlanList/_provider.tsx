import React from 'react'
import useTable from 'src/hooks/useTable/index'
import { getNonCallPlanList } from 'src/api/non-call-plan-list'
import { useColumnNonCallPlanList } from './columns'
import { useSFANonCallPlanListProvider } from './states'

export default function SFANonCallPlanListProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const table = useTable({
    funcApi: getNonCallPlanList,
    columns: useColumnNonCallPlanList(),
  })
  const SFANonCallPlanList = useSFANonCallPlanListProvider()

  return (
    <SFANonCallPlanList.Provider
      value={{
        state: {
          ...SFANonCallPlanList.state,
          table,
        },
        handler: SFANonCallPlanList.handler,
      }}
    >
      {children}
    </SFANonCallPlanList.Provider>
  )
}
