import React from 'react'
import { Text } from 'pink-lava-ui'
import { Col } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getDetailTransferGS } from 'src/api/logistic/transfer-to-gs'
import TransferToGSDetail from './detail'
import TransferToGSUpdate from './update'

export default function PageTransferToGSDetail() {
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const data: any = useDetail(getDetailTransferGS, { id: router.query.id as string })

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
            router.push('/logistic/transfer-to-gs')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
      </div>

      {/* <TransferToGSDetail data={data} /> */}
      <TransferToGSUpdate data={data} />

      {/* {data.status_name != '' &&
        data.status_name != undefined &&
        data.status_name != 'Wait For Approval' && (
          <TransferToGSDetail data={data} />
        )} */}
    </Col>
  )
}
