import React from 'react'
import { Text } from 'pink-lava-ui'
import { Col } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getListApprovalReservationDetail } from 'src/api/logistic/approve-stock-reservation'
import PageApproveStockReservationDetail from './detail'
import PageApproveStockReservationUpdate from './update'

export default function ApproveStocReservationDetail() {
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const data: any = useDetail(
    getListApprovalReservationDetail,
    { id: router.query.id as string },
    true,
  )

  return (
    <Col>
      <div style={{ display: 'flex', gap: 5 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push('/logistic/approval-stock-reservation')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
      </div>

      {data.status_name != '' &&
        data.status_name != undefined &&
        data.status_name != 'Wait For Approval' && (
          <PageApproveStockReservationDetail data={data} />
        )}

      {data.status_name != '' &&
        data.status_name != undefined &&
        data.status_name == 'Wait For Approval' && (
          <PageApproveStockReservationUpdate data={data} />
        )}
    </Col>
  )
}
