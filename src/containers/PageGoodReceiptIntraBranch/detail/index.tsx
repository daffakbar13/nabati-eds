import React from 'react'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getGoodReceiptDetailStoDelivery } from 'src/api/logistic/good-receipt-intra-branch'
import ContainerDetail from './detail'
import ContainerDetailDelivery from './detailDelivery'
import { Loader } from 'src/components'

export default function PageIntraChannelGoodIssueDetail() {
  const router = useRouter()
  const data: any = useDetail(
    getGoodReceiptDetailStoDelivery,
    {
      id: router.query.id as string,
      requestNumber: router.query.request_number as string,
      doc_type: 'WE' as string,
    },
    false,
  )
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (data.status) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [data])
  return (
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
        <>
          {data.status == 'Delivery' ? (
            <ContainerDetailDelivery data={data} />
          ) : (
            <ContainerDetail data={data} />
          )}
        </>
      )}
    </>
  )
}
