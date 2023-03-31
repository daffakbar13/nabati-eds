import { ArrowLeftOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { PATH } from 'src/configs/menus'
import { Text, Button } from 'pink-lava-ui'
import { useTitlePage } from 'src/hooks'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'

export default function SectionAction() {
  const {
    state: { data },
    handler: { showConfirm },
  } = useSalesQuotationDetailContext()
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const isStatus = (...value: string[]) => value.includes(data?.status_id)

  return (
    <>
      <Row justify="space-between">
        <Row gutter={5}>
          <Col>
            <ArrowLeftOutlined
              onClick={() => {
                router.push({ pathname: `${PATH.SALES}/customer` })
              }}
              style={{ fontSize: 25, lineHeight: '48px' }}
            />
          </Col>
          <Col>
            <Text variant={'h4'}>{titlePage}</Text>
          </Col>
        </Row>
      </Row>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card style={{ borderRadius: 10 }}>
            <div
              style={{
                width: 140,
                padding: 7,
                paddingLeft: 20,
                fontWeight: 600,
                border: '1.5px solid #aaa',
                borderRadius: 10,
                color: data?.customer?.is_active ? 'green' : 'red',
              }}
            >
              {data?.customer?.is_active ? 'Active' : 'Inactive'}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}
