import React from 'react'
import { getQuotation } from 'src/api/quotation'
import useTable from 'src/hooks/useTable/index'
import { useColumnCallPlanList } from './columns'
import { useSFACallPlanListProvider } from './states'

export default function SFACallPlanListProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const table = useTable({
    funcApi: getQuotation,
    // haveCheckBox: [{ rowKey: 'status_name', member: ['New'] }],
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
