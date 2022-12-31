import React from 'react'
import { getQuotation } from 'src/api/quotation'
import useTable from 'src/hooks/useTable/index'
import { useColumnQuotation } from './columns'
import { useSalesSalesmanDivisionProvider } from './states'

export default function SalesQuotationListProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const SalesQuotationList = useSalesSalesmanDivisionProvider()
  const table = useTable({
    funcApi: getQuotation,
    haveCheckBox: 'All',
    columns: useColumnQuotation(SalesQuotationList.handler),
  })

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
