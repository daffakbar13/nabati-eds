import React from 'react'
import { getSalesOrder } from 'src/api/sales-order'
import { useSalesSalesOrderListProvider } from 'src/hooks/contexts'
import useTable from 'src/hooks/useTable/index'
import { useColumnSalesOrder } from './columns'

export default function SalesSalesOrderListProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const table = useTable({
    funcApi: getSalesOrder,
    haveCheckBox: [
      { rowKey: 'status_name', member: ['New'] },
      { rowKey: 'status_availability_name', member: ['In Stock', 'Partial'] },
    ],
    columns: useColumnSalesOrder,
  })
  const SalesQuotationList = useSalesSalesOrderListProvider()

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
