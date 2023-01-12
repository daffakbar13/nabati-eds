import { DownOutlined } from '@ant-design/icons'
import { Col, Popover, Row } from 'antd'
import { useRouter } from 'next/router'
import { Search, Button, DatePickerInput } from 'pink-lava-ui'
import React from 'react'
import ReactToPrint from 'react-to-print'
import { downloadTemplateQuotation } from 'src/api/quotation'
import { ICDownloadTemplate, ICSyncData, ICUploadTemplate } from 'src/assets'
import { SmartFilter } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { colors } from 'src/configs/colors'
import { fieldBranchAll, fieldCustomer, fieldSalesOrg } from 'src/configs/fieldFetches'
import { useFilters } from 'src/hooks'
import { useSalesQuotationListContext } from '../states'

export default function SectionAction() {
  const {
    state: { table },
  } = useSalesQuotationListContext()
  const { oldfilters, filterId, setFilters, onChangeSearch } = useFilters(table, 'eds_order.id')
  const router = useRouter()
  const componentRef = React.useRef()
  const statusOption = [
    { label: 'New', value: '1' },
    { label: 'Draft', value: '6' },
    { label: 'Open', value: '7' },
    { label: 'Cancel', value: '5' },
  ]

  const moreContent = (
    <Row gutter={[10, 10]} style={{ fontWeight: 'bold', width: 200 }}>
      <Col span={24}>
        <ReactToPrint
          onBeforeGetContent={async () => {
            await downloadTemplateQuotation().then(() => {})
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
            placeholder="Search Quotation ID"
            width="380px"
            nameIcon="SearchOutlined"
            colorIcon={colors.grey.regular}
            value={filterId}
            onChange={(e) => onChangeSearch(e)}
            allowClear
          />
        </Col>
        <Col>
          <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
            <SmartFilter.Field
              field="sales_org_id"
              dataType="S"
              label="Sales Organization"
              options={['EQ', 'NE', 'BT', 'NB']}
            >
              <DebounceSelect type="select" fetchOptions={fieldSalesOrg} />
            </SmartFilter.Field>
            <SmartFilter.Field
              field="branch"
              dataType="S"
              label="Branch"
              options={['EQ', 'NE', 'BT', 'NB']}
            >
              <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
            </SmartFilter.Field>
            <SmartFilter.Field
              field="customer"
              dataType="S"
              label="Sold To Customer"
              options={['EQ', 'NE', 'BT', 'NB']}
            >
              <DebounceSelect type="select" fetchOptions={fieldCustomer} />
            </SmartFilter.Field>
            <SmartFilter.Field
              field="customer"
              dataType="S"
              label="Ship To Customer"
              options={['EQ', 'NE', 'BT', 'NB']}
            >
              <DebounceSelect type="select" fetchOptions={fieldCustomer} />
            </SmartFilter.Field>
            <SmartFilter.Field
              field="order_type"
              dataType="S"
              label="Order Type"
              options={['EQ', 'NE', 'BT', 'NB']}
            >
              <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
              <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
            </SmartFilter.Field>
            <SmartFilter.Field
              field="order_date"
              dataType="S"
              label="Order Date"
              options={['GE', 'EQ', 'LE', 'GT', 'LT', 'NE']}
            >
              <DatePickerInput
                label={''}
                fullWidth
                format={'DD-MMM-YYYY'}
                placeholder="Posting Date"
              />
              <DatePickerInput
                fullWidth
                label={''}
                format={'DD-MMM-YYYY'}
                placeholder="Posting Date"
              />
            </SmartFilter.Field>
            <SmartFilter.Field
              field="status_id"
              dataType="S"
              label="Status"
              options={['EQ', 'NE', 'BT', 'NB']}
            >
              <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
              <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
            </SmartFilter.Field>
          </SmartFilter>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col>
          <Popover placement="bottom" content={moreContent} trigger="click">
            <Button
              size="big"
              variant="secondary"
              onClick={downloadTemplateQuotation}
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
