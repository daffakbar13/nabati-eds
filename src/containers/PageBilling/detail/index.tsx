import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Spacer, Text } from 'pink-lava-ui'
import { Card, Popup } from 'src/components'
import { Tabs, Col, Typography, Row, Checkbox } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { useRouter } from 'next/router'
import { useDetail } from 'src/hooks'
import { getDetailBilling, printBilling } from 'src/api/billing'
import ReactToPrint from 'react-to-print'
import AllTabs from './tabs'
import DocumentFlow from './tabs/DocumentFlow'
import CustomerInfo from './tabs/CustomerInfo'
import SalesmanInfo from './tabs/SalesmanInfo'
import Billing from './tabs/Billing'
import PricingCondition from './tabs/PricingCondition'
import PrintBilling from '../print'

export default function PageBillingDetail() {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const [showConfirmPrint, setShowConfirmPrint] = React.useState(false)
  const [printData, setPrintData] = React.useState({
    invoice: { checked: true, data: [] },
    suratJalan: { checked: true, data: [] },
  })
  const router = useRouter()
  const data = useDetail(getDetailBilling, { id: router.query.id as string })
  const printRef = React.useRef<HTMLDivElement>()
  const hasData = Object.keys(data).length > 0

  return (
    <Col>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push('/sales/billing')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          {data.status_id === '1' && (
            <>
              {/* <Button size="big" variant="tertiary" onClick={() => {}}>
                Cancel Process
              </Button> */}
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  setShowConfirmPrint(true)
                }}
              >
                Print
              </Button>
            </>
          )}
          {(data.status_id === '7' || data.status_id === '4') && (
            <Button size="big" variant="primary">
              Print
            </Button>
          )}
        </div>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>
        <Tabs
          defaultActiveKey="1"
          onChange={(asd) => {
            setCurrentTab(asd)
          }}
          items={AllTabs}
        />
        {hasData && (
          <>
            {currentTab === '1' && <Billing data={data} />}
            {currentTab === '2' && <PricingCondition data={data} />}
            {currentTab === '3' && <DocumentFlow />}
            {currentTab === '4' && <CustomerInfo data={data} />}
            {currentTab === '5' && <SalesmanInfo data={data} />}
          </>
        )}
      </Card>
      {showConfirmPrint && (
        <Popup>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Select To Print
          </Typography.Title>
          <Row justify="space-between">
            <Col span={12}>
              <Checkbox
                checked={printData.invoice.checked}
                onChange={(e) =>
                  setPrintData((prev) => ({
                    ...prev,
                    invoice: { ...prev.invoice, checked: e.target.checked },
                  }))
                }
              >
                Invoice
              </Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox
                checked={printData.suratJalan.checked}
                onChange={(e) =>
                  setPrintData((prev) => ({
                    ...prev,
                    suratJalan: { ...prev.suratJalan, checked: e.target.checked },
                  }))
                }
              >
                Surat Jalan
              </Checkbox>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col>
              <Button variant="tertiary" onClick={() => setShowConfirmPrint(false)}>
                Cancel
              </Button>
            </Col>
            <Col>
              <ReactToPrint
                onBeforeGetContent={() =>
                  printBilling({
                    ...(printData.invoice.checked && { invoice_ids: [data.so_number] }),
                    ...(printData.suratJalan.checked && { surat_jalan_ids: [data.so_number] }),
                  }).then((res) => {
                    setPrintData((prev) => ({
                      invoice: { ...prev.invoice, data: res.data.invoice || [] },
                      suratJalan: { ...prev.suratJalan, data: res.data.surat_jalan || [] },
                    }))
                  })
                }
                onAfterPrint={() =>
                  setPrintData((prev) => ({
                    invoice: { ...prev.invoice, data: [] },
                    suratJalan: { ...prev.suratJalan, data: [] },
                  }))
                }
                content={() => printRef.current}
                trigger={() => <Button variant="primary">Print</Button>}
              />
            </Col>
          </Row>
        </Popup>
      )}
      <div ref={printRef} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <PrintBilling invoice={printData.invoice.data} surat_jalan={printData.suratJalan.data} />
      </div>
    </Col>
  )
}
