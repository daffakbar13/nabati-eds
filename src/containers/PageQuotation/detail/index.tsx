import React from 'react'
import { Card, Loader } from 'src/components'
import { Col, Row } from 'antd'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getDetailQuotation } from 'src/api/quotation'
import { SectionAction, SectionConfirm, SectionTab } from './sections'

export default function PageQuotationDetail() {
  const [showConfirm, setShowConfirm] = React.useState<string>()
  const [proccessing, setProccessing] = React.useState<string>()
  const router = useRouter()
  const data = useDetail(getDetailQuotation, { id: router.query.id as string })
  const hasData = Object.keys(data).length > 0

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <SectionAction handleShowConfirm={setShowConfirm} />
      </Col>
      <Col span={24}>
        <Card>
          <SectionTab data={data} />
        </Card>
      </Col>
      {!hasData && <Loader type="process" text="Wait for get data" />}
      {proccessing && <Loader type="process" text={proccessing} />}
      <SectionConfirm
        handleProcess={setProccessing}
        handleShowConfirm={setShowConfirm}
        showConfirm={showConfirm}
      />
    </Row>
  )
}
