import React from 'react'
import moment from 'moment'
import { Col, Row } from 'antd'
import { DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldCustomer } from 'src/configs/fieldFetches'
import { useSalesQuotationCreateContext } from '../states'
import { Card } from 'src/components'

export default function SectionField() {
  const {
    state: { dataForm, optionsOrderType, optionsSalesOrg, optionsBranch, optionsSalesman },
    handler: { onChangeForm, setFetching },
  } = useSalesQuotationCreateContext()

  return (
    <>
      <Col span={24}>
        <Card>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <DebounceSelect
                type="input"
                required
                label="Name"
                placeholder={'Type here...'}
                value={dataForm.order_type_id}
                options={optionsOrderType}
                onChange={(e: any) => {
                  onChangeForm('order_type_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="Phone Number"
                required
                placeholder={'Type here...'}
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="Short Name"
                placeholder={'Type here...'}
                value={dataForm?.ship_to_id}
                options={[{ label: dataForm?.customer_id, value: dataForm?.customer_id }]}
                onChange={(e: any) => {
                  onChangeForm('ship_to_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="Email"
                placeholder={'Type here...'}
                value={dataForm?.ship_to_id}
                options={[{ label: dataForm?.customer_id, value: dataForm?.customer_id }]}
                onChange={(e: any) => {
                  onChangeForm('ship_to_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="KTP"
                placeholder={'Type here...'}
                value={dataForm?.ship_to_id}
                options={[{ label: dataForm?.customer_id, value: dataForm?.customer_id }]}
                onChange={(e: any) => {
                  onChangeForm('ship_to_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Tax Subject"
                placeholder={'No Tax'}
                value={dataForm?.ship_to_id}
                options={[{ label: dataForm?.customer_id, value: dataForm?.customer_id }]}
                onChange={(e: any) => {
                  onChangeForm('ship_to_id', e.value)
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Customer Group"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Customer Group 3"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Customer Group 1"
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Customer Group 4"
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Customer Group 2"
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Customer Group 5"
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Company"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Sales Office"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Sales Organization"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Sales Division"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Branch"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Sales Channel"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="SLoc"
                placeholder={'Select'}
                value={dataForm?.ship_to_id}
                options={[{ label: dataForm?.customer_id, value: dataForm?.customer_id }]}
                onChange={(e: any) => {
                  onChangeForm('ship_to_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Sales Group"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={24}>
              <DebounceSelect
                type="select"
                label="Salesman"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Term of Payment"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Tax Subject"
                placeholder={'Select'}
                value={dataForm?.ship_to_id}
                options={[{ label: dataForm?.customer_id, value: dataForm?.customer_id }]}
                onChange={(e: any) => {
                  onChangeForm('ship_to_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Method of Payment"
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="Tax Reg Num. (NPWP)"
                placeholder={'Type here...'}
                value={dataForm.order_type_id}
                options={optionsOrderType}
                onChange={(e: any) => {
                  onChangeForm('order_type_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Block"
                placeholder={'Select'}
                value={dataForm?.ship_to_id}
                options={[{ label: dataForm?.customer_id, value: dataForm?.customer_id }]}
                onChange={(e: any) => {
                  onChangeForm('ship_to_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Risk Class"
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="Credit Limit"
                placeholder={'Type here...'}
                value={dataForm.order_type_id}
                options={optionsOrderType}
                onChange={(e: any) => {
                  onChangeForm('order_type_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Rules"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DatePickerInput
                fullWidth
                onChange={(val: any) => {
                  if (val !== null) {
                    onChangeForm('order_date', new Date(moment(val).format()).toISOString())
                  }
                }}
                label="Credit Limit Valid To"
                disabledDate={(current) => current < moment().startOf('day')}
                value={moment(dataForm?.order_date)}
                format={'DD-MMM-YYYY'}
                required
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Check Rule"
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Price Group"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Inco 1"
                required
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="Taxable Enter Num. (SPPKP)"
                placeholder={'Type here...'}
                value={dataForm.order_type_id}
                options={optionsOrderType}
                onChange={(e: any) => {
                  onChangeForm('order_type_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="Inco 2"
                required
                placeholder={'Type here...'}
                value={dataForm.order_type_id}
                options={optionsOrderType}
                onChange={(e: any) => {
                  onChangeForm('order_type_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="select"
                label="Price List"
                value={dataForm?.customer_id}
                fetchOptions={fieldCustomer}
                onChange={(e: any) => {
                  onChangeForm('customer_id', e.value)
                  setFetching('customer')
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="PKP City"
                placeholder={'Type here...'}
                value={dataForm.order_type_id}
                options={optionsOrderType}
                onChange={(e: any) => {
                  onChangeForm('order_type_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="PKP Name"
                placeholder={'Type here...'}
                value={dataForm.order_type_id}
                options={optionsOrderType}
                onChange={(e: any) => {
                  onChangeForm('order_type_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="PKP Address 2"
                placeholder={'Type here...'}
                value={dataForm.order_type_id}
                options={optionsOrderType}
                onChange={(e: any) => {
                  onChangeForm('order_type_id', e.value)
                }}
              />
            </Col>
            <Col span={12}>
              <DebounceSelect
                type="input"
                label="PKP Address 1"
                placeholder={'Type here...'}
                value={dataForm.order_type_id}
                options={optionsOrderType}
                onChange={(e: any) => {
                  onChangeForm('order_type_id', e.value)
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  )
}
