import { useRouter } from 'next/router'
import React from 'react'
import { getDetailQuotation } from 'src/api/quotation'
import { useDetail } from 'src/hooks'
import { useSalesQuotationDetailProvider } from 'src/hooks/contexts'

export default function SalesQuotationDetailProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const router = useRouter()
  const SalesQuotationDetail = useSalesQuotationDetailProvider()
  const data = useDetail(getDetailQuotation, { id: router.query.id as string })

  React.useEffect(() => {
    if (data.status_id === '6') {
      router.push(router.asPath.replace('detail', 'edit'))
    }
  }, [data])

  return (
    <SalesQuotationDetail.Provider
      value={{
        state: {
          ...SalesQuotationDetail.state,
          data, // tableTabQuotation
        },
        handler: SalesQuotationDetail.handler,
      }}
    >
      {data && children}
    </SalesQuotationDetail.Provider>
  )
}
