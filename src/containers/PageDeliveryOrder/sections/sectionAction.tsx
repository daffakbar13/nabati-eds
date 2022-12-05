import { DownOutlined } from '@ant-design/icons'
import { Col, Popover, Row } from 'antd'
import { useRouter } from 'next/router'
import { Search, Button } from 'pink-lava-ui'
import React from 'react'
import ReactToPrint from 'react-to-print'
// import { downloadTemplateDeliveryOrder } from 'src/api/sales-order'
import { ICDownloadTemplate, ICSyncData, ICUploadTemplate } from 'src/assets'
import { colors } from 'src/configs/colors'

interface SectionActionProps {
  handleFilter: (newBody: any[]) => void
}

export default function SectionAction(props: SectionActionProps) {
  const { handleFilter } = props
  const componentRef = React.useRef()
  const router = useRouter()

  const moreContent = (
    <Row gutter={[10, 10]} style={{ fontWeight: 'bold', width: 200 }}>
      <Col span={24}>
        <ReactToPrint
          onBeforeGetContent={async () => {
            // await downloadTemplateDeliveryOrder().then(() => {})
          }}
          removeAfterPrint
          trigger={() => (
            <Row gutter={10}>
              <Col>
                <ICDownloadTemplate />
              </Col>
              <Col> Download Template</Col>
            </Row>
          )}
          content={() => componentRef.current}
        />
      </Col>
      <Col span={24}>
        <Row gutter={10}>
          <Col>
            <ICUploadTemplate />
          </Col>
          <Col> Upload Template</Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={10}>
          <Col>
            <ICSyncData />
          </Col>
          <Col> Sync Data</Col>
        </Row>
      </Col>
    </Row>
  )

  return (
    <Row justify="space-between">
      <Row gutter={10}>
        <Col>
          <Search
            width="380px"
            nameIcon="SearchOutlined"
            placeholder="Search DeliveryOrder ID"
            colorIcon={colors.grey.regular}
            onChange={(e) => {
              const { value } = e.target
              if (value === '') {
                handleFilter([])
              } else {
                handleFilter([
                  {
                    field: 'eds_order.id',
                    option: 'CP',
                    from_value: `%${e.target.value}%`,
                  },
                ])
              }
            }}
          />
        </Col>
        <Col>
          {/* <SmartFilter
                onOk={(newVal) => {
                  const newFiltered = newVal
                    .filter((obj) => obj.fromValue)
                    .map((obj) => ({
                      field: `eds_order.${obj.field}`,
                      option: obj.option,
                      from_value: obj.fromValue.value,
                      to_value: obj.toValue?.value,
                    }))
                  setFilters(newVal)
                  table.handleFilter(newFiltered)
                }}
                filters={filters}
              /> */}
        </Col>
      </Row>
      <Row gutter={10}>
        <Col>
          <Popover placement="bottom" content={moreContent} trigger="click">
            <Button
              size="big"
              variant="secondary"
              // onClick={downloadTemplateDeliveryOrder}
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
            onClick={() => router.push(`${router.pathname}/create`)}
          >
            Create
          </Button>
        </Col>
      </Row>
    </Row>
  )
}
