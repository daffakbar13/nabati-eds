import React from 'react'
import { getQuotation } from 'src/api/quotation'
import { useTable } from 'src/hooks'
import { useSalesQuotationListContext } from 'src/hooks/contexts'
import { useColumnQuotation } from './columns'

export default function SalesQuotationListProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const table = useTable({
    funcApi: getQuotation,
    haveCheckbox: { headCell: 'status_name', member: ['New'] },
    columns: useColumnQuotation,
  })
  const pageCtx = useSalesQuotationListContext()

  return (
    <pageCtx.getProvider
      value={{
        state: {
          ...pageCtx.state,
          table,
        },
        handler: pageCtx.handler,
      }}
    >
      {children}
    </pageCtx.getProvider>
  )
}
