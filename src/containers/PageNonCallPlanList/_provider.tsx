import React from 'react'
import { getQuotation } from 'src/api/quotation'
import useTable from 'src/hooks/useTable/index'
import { useColumnNonCallPlanList } from './columns'
import { useSFANonCallPlanListProvider } from './states'

export default function SFANonCallPlanListProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const table = useTable({
    funcApi: getQuotation,
    // haveCheckBox: [{ rowKey: 'status_name', member: ['New'] }],
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
