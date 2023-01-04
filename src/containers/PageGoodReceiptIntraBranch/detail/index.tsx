import React from 'react'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getGoodReceiptDetail } from 'src/api/logistic/good-receipt-intra-branch'
import ContainerDetail from './detail'
import ContainerDetailDelivery from './detailDelivery'

export default function PageIntraChannelGoodIssueDetail() {
  const router = useRouter()
  const data: any = useDetail(getGoodReceiptDetail, { id: router.query.id as string }, false)

  return (
    <>
      {data.status == 'Delivery' ? (
        <ContainerDetailDelivery data={data} />
      ) : (
        <ContainerDetail data={data} />
      )}
    </>
  )
}
