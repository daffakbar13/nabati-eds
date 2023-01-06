import React from 'react'
import { Text } from 'pink-lava-ui'
import { Col } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getDetailTransferGS } from 'src/api/logistic/transfer-to-gs'
import { Loader } from 'src/components'
import TransferToGSDetail from './detail'
import TransferToGSUpdate from './update'

export default function PageTransferToGSDetail() {
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const data: any = useDetail(getDetailTransferGS, { id: router.query.id as string }, false)

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
                router.push('/logistic/transfer-to-gs')
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: 25 }} />
            </div>
            <Text variant={'h4'}>{titlePage}</Text>
          </div>

          {data.status_name != '' &&
            data.status_name != undefined &&
            data.status_name != 'Wait For Approval' && <TransferToGSDetail data={data} />}

          {(data.status_name != '' && data.status_name == 'Pending') ||
            (data.status_name == 'Wait For Approval' && <TransferToGSUpdate data={data} />)}
        </Col>
      )}
    </>
  )
}
