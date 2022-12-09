import { useRouter } from 'next/router'
import React from 'react'
import { getDetailSalesOrder } from 'src/api/sales-order'
import { useDetail } from 'src/hooks'
import { useSalesSalesOrderDetailProvider } from 'src/hooks/contexts'

export default function SalesSalesOrderDetailProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const SalesQuotationList = useSalesSalesOrderDetailProvider()
  const router = useRouter()
  const data = useDetail(getDetailSalesOrder, { id: router.query.id as string })

  return (
    <SalesQuotationList.Provider
      value={{
        state: { ...SalesQuotationList.state, data },
        handler: SalesQuotationList.handler,
      }}
    >
      {children}
    </SalesQuotationList.Provider>
  )
}
