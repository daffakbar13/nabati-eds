import { ArrowLeftOutlined, DownOutlined, EditOutlined, ProfileOutlined } from '@ant-design/icons'
import { Col, Popover, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { PATH } from 'src/configs/menus'
import { Text, Button } from 'pink-lava-ui'
import { useTitlePage } from 'src/hooks'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { multipleSubmitQuotation } from 'src/api/quotation'

export default function SectionAction() {
  const {
    state: { data },
    handler: { showConfirm, runProcess, stopProcess, setNewSalesOrder },
  } = useSalesQuotationDetailContext()
  const titlePage = useTitlePage('detail')
  const router = useRouter()
  const isStatus = (...value: string[]) => value.includes(data.status_id)

  const moreContent = (
    <>
      <Row gutter={[10, 10]} style={{ fontWeight: 'bold', width: 144 }}>
        {isStatus('7', '1') && (
          <Col
            span={24}
            onClick={() => {
              router.push(`${PATH.SALES}/quotation/create?id=${router.query.id}`)
            }}
            style={{ cursor: 'pointer' }}
          >
            <Row gutter={10}>
              <Col>
                <ProfileOutlined />
              </Col>
              <Col> Order Again</Col>
            </Row>
          </Col>
        )}
        {isStatus('7', '1') && (
          <Col
            span={24}
            onClick={() => {
              router.push(`${PATH.SALES}/quotation/edit/${router.query.id}`)
            }}
            style={{ cursor: 'pointer' }}
          >
            <Row gutter={10}>
              <Col>
                <EditOutlined />
              </Col>
              <Col> Edit</Col>
            </Row>
          </Col>
        )}
      </Row>
    </>
  )

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
          <>
            <Col>
              <Popover placement="bottom" content={moreContent} trigger="click">
                <Button
                  size="big"
                  variant="secondary"
                  // onClick={downloadTemplateQuotation}
                  style={{ gap: 5 }}
                >
                  More <DownOutlined />
                </Button>
              </Popover>
            </Col>
            <Col>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  runProcess('Wait for submitting Sales Order')
                  multipleSubmitQuotation({ order_list: [{ id: router.query.id as string }] })
                    .then((res) => {
                      const [first] = res.data.results
                      setNewSalesOrder(first.id)
                      showConfirm('success-submit')
                      stopProcess()
                    })
                    .catch(() => stopProcess())
                }}
              >
                Submit
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Row>
  )
}
