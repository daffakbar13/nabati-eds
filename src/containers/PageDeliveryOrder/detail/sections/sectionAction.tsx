import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { PATH } from 'src/configs/menus'
import { Text, Button } from 'pink-lava-ui'
import { useTitlePage } from 'src/hooks'

interface SectionActionProps {
  handleShowConfirm: (confirm: string) => void
  data: any
}

export default function SectionAction(props: SectionActionProps) {
  const { handleShowConfirm, data } = props
  const titlePage = useTitlePage('detail')
  const router = useRouter()

  const isStatus = (...value: string[]) => value.includes(data.status)
  const isOrderType = (...value: string[]) => value.includes(data.order_type)

  return (
    <Row justify="space-between">
      <Row gutter={5}>
        <Col>
          <ArrowLeftOutlined
            onClick={() => {
              router.push(`${PATH.SALES}/delivery-order`)
            }}
            style={{ fontSize: 25, lineHeight: '48px' }}
          />
        </Col>
        <Col>
          <Text variant={'h4'}>{titlePage}</Text>
        </Col>
      </Row>
      <Row gutter={10}>
        {isStatus('New') && (
          <>
            <Col>
              <Button
                size="big"
                variant="tertiary"
                onClick={() => {
                  handleShowConfirm('cancel')
                }}
              >
                Cancel Process
              </Button>
            </Col>
            {isOrderType('ZDCC') && (
              <Col>
                <Button
                  size="big"
                  variant="secondary"
                  onClick={() => {
                    router.push(
                      `${PATH.SALES}/delivery-order/edit/${router.query.id}?status=${router.query.status}`,
                    )
                  }}
                >
                  Edit
                </Button>
              </Col>
            )}
          </>
        )}
        {isStatus('Complete', 'New') && isOrderType('ZDCC') && (
          <Col>
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                router.push(
                  `${PATH.SALES}/delivery-order/create?id=${router.query.id}&status=${router.query.status}`,
                )
              }}
            >
              Order Again
            </Button>
          </Col>
        )}
      </Row>
    </Row>
  )
}
