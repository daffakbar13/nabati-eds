import React from 'react'
import { getQuotation } from 'src/api/quotation'
import useTable from 'src/hooks/useTable/index'
import { useColumnQuotation } from './columns'
import { useSalesSalesmanDivisionProvider } from './states'

export default function SalesSalesmanDivisionProductProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const SalesSalesmanDivisionProduct = useSalesSalesmanDivisionProvider()
  const table = useTable({
    funcApi: getQuotation,
    haveCheckBox: 'All',
    columns: useColumnQuotation(SalesSalesmanDivisionProduct.handler),
  })

  return (
    <SalesSalesmanDivisionProduct.Provider
      value={{
        state: {
          ...SalesSalesmanDivisionProduct.state,
          table,
        },
        handler: SalesSalesmanDivisionProduct.handler,
      }}
    >
      {children}
    </SalesSalesmanDivisionProduct.Provider>
  )
}
