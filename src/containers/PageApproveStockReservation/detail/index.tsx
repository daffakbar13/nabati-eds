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
import { Loader } from 'src/components'

export default function ApproveStocReservationDetail() {
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const data: any = useDetail(
    getListApprovalReservationDetail,
    { id: router.query.id as string },
    false,
  )

  React.useEffect(() => {
    if (data.status_name) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [data])

  return (
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
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
            <Text variant={'h4'}>
              View Approval Stock Reservation Canvas {data.reservation_number}
            </Text>
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
      )}
    </>
  )
}
