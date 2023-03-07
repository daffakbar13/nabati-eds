import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
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
  const isStatus = (...value: string[]) => value.includes(data.status_id)

  return (
    <Row justify="space-between">
      <Row gutter={5}>
        <Col>
          <ArrowLeftOutlined
            onClick={() => {
              router.push({ pathname: `${PATH.SALES}/quotation` })
            }}
            style={{ fontSize: 25, lineHeight: '48px' }}
          />
        </Col>
        <Col>
          <Text variant={'h4'}>{titlePage}</Text>
        </Col>
      </Row>
      <Row gutter={10}>
        {isStatus('1') && (
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
                  router.push(`${PATH.SALES}/quotation/edit/${router.query.id}`)
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
                  `${PATH.SALES}/quotation/create?id=${router.query.id}&status=${router.query.status}`,
                )
              }}
            >
              Order Again
            </Button>
          </Col>
        )}
        {isStatus('7') && (
          <Col>
            <Button size="big" variant="primary" onClick={() => {}}>
              Submit
            </Button>
          </Col>
        )}
      </Row>
    </Row>
  )
}
