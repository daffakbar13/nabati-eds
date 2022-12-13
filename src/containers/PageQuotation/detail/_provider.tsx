import { useRouter } from 'next/router'
import React from 'react'
import { getDetailQuotation } from 'src/api/quotation'
import { useDetail } from 'src/hooks'
import { useSalesQuotationDetailProvider } from 'src/hooks/contexts'
import useTable from 'src/hooks/useTable/index'
import { ColumnsQuotation } from './columns'

export default function SalesQuotationDetailProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const router = useRouter()
  const SalesQuotationDetail = useSalesQuotationDetailProvider()
  const data = useDetail(getDetailQuotation, { id: router.query.id as string }, false)
  const tableTabQuotation = useTable({
    columns: ColumnsQuotation,
    data: [],
    removeHideShowColums: true,
  })

  React.useEffect(() => {
    if (Object.keys(data).length > 0) {
      tableTabQuotation.handler.updateData(data.items)
    }
  }, [data])

  return (
    <SalesQuotationDetail.Provider
      value={{
        state: { ...SalesQuotationDetail.state, data, tableTabQuotation },
        handler: SalesQuotationDetail.handler,
      }}
    >
      {children}
    </SalesQuotationDetail.Provider>
  )
}
