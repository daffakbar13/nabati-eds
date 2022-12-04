import { useRouter } from 'next/router'
import React from 'react'
import { getDetailQuotation } from 'src/api/quotation'
import { useDetail } from 'src/hooks'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'

export default function SalesQuotationDetailProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const pageCtx = useSalesQuotationDetailContext()
  const router = useRouter()
  const data = useDetail(getDetailQuotation, { id: router.query.id as string })

  return (
    <pageCtx.getProvider
      value={{
        state: { ...pageCtx.state, data },
        handler: pageCtx.handler,
      }}
    >
      {props.children}
    </pageCtx.getProvider>
  )
}
