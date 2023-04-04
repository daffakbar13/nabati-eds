import React from 'react'
import useTable from 'src/hooks/useTable/index'
import { getCallPlanList } from 'src/api/call-plan-list'
import { useColumnCallPlanList } from './columns'
import { useSFACallPlanListProvider } from './states'

export default function SFACallPlanListProvider(props: React.PropsWithChildren<React.ReactNode>) {
  const { children } = props
  const table = useTable({
    funcApi: getCallPlanList,
    columns: useColumnCallPlanList(),
  })
  const SFACallPlanList = useSFACallPlanListProvider()

  return (
    <SFACallPlanList.Provider
      value={{
        state: {
          ...SFACallPlanList.state,
          table,
        },
        handler: SFACallPlanList.handler,
      }}
    >
      {children}
    </SFACallPlanList.Provider>
  )
}
