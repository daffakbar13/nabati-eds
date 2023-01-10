/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React from 'react'
import moment from 'moment'
import { Col, Row } from 'antd'
import { DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldCustomer } from 'src/configs/fieldFetches'
import dateFormat from 'src/utils/dateFormat'
import { payloadCreate } from '..'

interface SectionFieldProps {
  dataForm: payloadCreate
  optionsOrderType: any[]
  optionsSalesOrg: any[]
  optionsBranch: any[]
  optionsSalesman: any[]
  onChangeForm: (field: string, value: string) => void
  handleFetching: (fetch: 'customer' | 'load-options') => void
}

export default function SectionField(props: SectionFieldProps) {
  const {
    dataForm,
    optionsOrderType,
    onChangeForm,
    optionsSalesOrg,
    optionsBranch,
    handleFetching,
    optionsSalesman,
  } = props

  return (
    <Row gutter={[10, 10]}>
      <Col span={8}>
        <DebounceSelect
          type="select"
          required
          label="Order Type"
          placeholder={'Select'}
          value={'ZDCC - DO-Cost Center'}
          options={[{ label: 'ZDCC - DO-Cost Center', value: 'ZDCC - DO-Cost Center' }]}
          onChange={(e: any) => {
            onChangeForm('order_type', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Sold To Customer"
          required
          value={dataForm.sold_to_customer}
          fetchOptions={fieldCustomer}
          onChange={(e: any) => {
            onChangeForm('sold_to_customer', e.value)
            handleFetching('customer')
          }}
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Ship To Customer"
          placeholder={'Select'}
          value={dataForm.ship_to_customer}
          options={[{ label: dataForm.sold_to_customer, value: dataForm.sold_to_customer }]}
          onChange={(e: any) => {
            onChangeForm('ship_to_customer', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            onChangeForm('document_date', new Date(moment(val).format()).toISOString())
          }}
          label="Document Date"
          disabledDate={(current) => current < moment().startOf('day')}
          value={moment(dataForm.document_date)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Sales Organization"
          placeholder={'Select'}
          value={dataForm.sales_org_id}
          options={optionsSalesOrg}
          onChange={(e: any) => {
            onChangeForm('sales_org_id', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Branch"
          placeholder={'Select'}
          value={dataForm.branch_id}
          options={optionsBranch}
          onChange={(e: any) => {
            onChangeForm('branch_id', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            onChangeForm('loading_date', dateFormat(val))
          }}
          label="Loading Date"
          disabledDate={(current) => current < moment().startOf('day')}
          value={moment(dataForm.loading_date)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            onChangeForm('delivery_date', dateFormat(val))
            onChangeForm('pricing_date', new Date(moment(val).format()).toISOString())
          }}
          label="Delivery Date"
          disabledDate={(current) => current < moment().startOf('day')}
          value={moment(dataForm.delivery_date)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Salesman"
          placeholder="Select"
          value={dataForm.salesman_id}
          options={optionsSalesman}
          onChange={(e: any) => {
            onChangeForm('salesman_id', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="input"
          label="Reference"
          placeholder="e.g Type Here..."
          value={dataForm.reference}
          onChange={(e: any) => {
            onChangeForm('reference', e.target.value)
          }}
        />
      </Col>
      <Col span={8}></Col>
    </Row>
  )
}
