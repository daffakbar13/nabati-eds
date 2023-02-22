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
  // const isStatus = data?.status?.id

  // STATUS 00 WAIT APPROVAL, 01 APPROVED 02 = REJECT, 06 DRAFT
  console.log(data)
  return (
    <>
      <Row justify="space-between">
        <Row gutter={5}>
          <Col>
            <ArrowLeftOutlined
              onClick={() => {
                router.push({ pathname: `${PATH.SALES}/customer-noo` })
              }}
              style={{ fontSize: 25, lineHeight: '48px' }}
            />
          </Col>
          <Col>
            <Text variant={'h4'}>{titlePage}</Text>
          </Col>
        </Row>

        {/* <Row gutter={10}>
          {isStatus('02') && (
            <>
              <Col>
                <Button
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    showConfirm('cancel')
                  }}
                >
                  Cancel Process
                </Button>
              </Col>
              <Col>
                <Button
                  size="big"
                  variant="secondary"
                  onClick={() => {
                    router.push(`${PATH.SALES}/customer-noo/edit/${router.query.id}`)
                  }}
                >
                  Edit
                </Button>
              </Col>
            </>
          )}
          {isStatus('3', '1') && (
            <Col>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  router.push(
                    `${PATH.SALES}/customer-noo/create?id=${router.query.id}&status=${router.query.status}`,
                  )
                }}
              >
                Order Again
              </Button>
            </Col>
          )}
        </Row> */}
      </Row>

      <Row gutter={[20, 20]} justify="space-between">
        <Col span={24}>
          <Card style={{ borderRadius: 10 }}>
            <Row justify="space-between">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 140,
                  padding: 5,
                  fontWeight: 600,
                  border: '1.5px solid #aaa',
                  borderRadius: 10,
                  color: data?.customer?.is_active ? 'green' : 'red',
                }}
              >
                {data?.customer?.is_active ? 'Active' : 'Inactive'}
              </div>
              <Row gutter={10}>
                {isStatus('02') && (
                  <>
                    {/* <Col>
                      <Button
                        size="big"
                        variant="tertiary"
                        onClick={() => {
                          showConfirm('cancel')
                        }}
                      >
                        Cancel Process
                      </Button>
                    </Col> */}
                    <Col>
                      <Button
                        size="big"
                        variant="secondary"
                        onClick={() => {
                          router.push(`${PATH.SALES}/customer-noo/edit/${router.query.id}`)
                        }}
                      >
                        Edit
                      </Button>
                    </Col>
                  </>
                )}
                {isStatus('3', '1') && (
                  <Col>
                    <Button
                      size="big"
                      variant="primary"
                      onClick={() => {
                        router.push(
                          `${PATH.SALES}/customer-noo/create?id=${router.query.id}&status=${router.query.status}`,
                        )
                      }}
                    >
                      Order Again
                    </Button>
                  </Col>
                )}
              </Row>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}
