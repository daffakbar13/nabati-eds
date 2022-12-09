import React from 'react'
import { getQuotation } from 'src/api/quotation'
import { useSalesQuotationListProvider } from 'src/hooks/contexts'
import useTable from 'src/hooks/useTable/index'
import { useColumnQuotation } from './columns'

export default function SalesQuotationListProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const table = useTable({
    funcApi: getQuotation,
    haveCheckBox: { rowKey: 'status_name', member: ['New'] },
    columns: useColumnQuotation,
  })
  const SalesQuotationList = useSalesQuotationListProvider()

  return (
    <SalesQuotationList.Provider
      value={{
        state: {
          ...SalesQuotationList.state,
          table,
        },
        handler: SalesQuotationList.handler,
      }}
    >
      {children}
    </SalesQuotationList.Provider>
  )
}
