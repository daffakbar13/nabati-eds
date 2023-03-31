import React from 'react'
import moment from 'moment'
import { Col, Row } from 'antd'
import { DatePickerInput } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldCustomer } from 'src/configs/fieldFetches'
import { useSalesSalesOrderCreateContext } from 'src/hooks/contexts'
import { useRouter } from 'next/router'

export default function SectionField() {
  const {
    state: { dataForm, optionsOrderType, optionsSalesOrg, optionsBranch, optionsSalesman },
    handler: { onChangeForm, setFetching },
  } = useSalesSalesOrderCreateContext()
  const router = useRouter()
  const isEditPage = router.asPath.includes('edit')

  return (
    <Row gutter={[10, 10]}>
      <Col span={8}>
        <DebounceSelect
          type="select"
          required
          label="Order Type"
          disabled={isEditPage}
          placeholder={'Select'}
          value={dataForm.order_type_id}
          options={optionsOrderType}
          onChange={(e: any) => {
            onChangeForm('order_type_id', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Sold To Customer"
          required
          disabled={isEditPage}
          value={dataForm?.customer_id}
          fetchOptions={fieldCustomer}
          onChange={(e: any) => {
            onChangeForm('customer_id', e.value)
            setFetching('customer')
          }}
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Ship To Customer"
          placeholder={'Select'}
          disabled={isEditPage}
          value={dataForm?.ship_to_id}
          options={[{ label: dataForm?.customer_id, value: dataForm?.customer_id }]}
          onChange={(e: any) => {
            onChangeForm('ship_to_id', e.value)
          }}
        />
      </Col>
      <Col span={8}>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            if (val !== null) {
              onChangeForm('order_date', new Date(moment(val).format()).toISOString())
            }
          }}
          label="Document Date"
          disabledDate={(current) => current < moment().startOf('day')}
          value={moment(dataForm?.order_date)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Sales Organization"
          placeholder={'Select'}
          disabled={isEditPage}
          value={dataForm?.sales_org_id}
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
          disabled={isEditPage}
          placeholder={'Select'}
          value={dataForm?.branch_id}
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
            if (val !== null) {
              onChangeForm('valid_from', new Date(moment(val).format()).toISOString())
            }
          }}
          label="Valid From"
          disabledDate={(current) => current < moment().startOf('day')}
          value={moment(dataForm?.valid_from)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            if (val !== null) {
              onChangeForm('valid_to', new Date(moment(val).format()).toISOString())
            }
          }}
          label="Valid To"
          disabledDate={(current) => current < moment().endOf('day')}
          value={moment(dataForm?.valid_to)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            if (val !== null) {
              onChangeForm('delivery_date', new Date(moment(val).format()).toISOString())
              onChangeForm('pricing_date', new Date(moment(val).format()).toISOString())
            }
          }}
          label="Delivery Date"
          disabledDate={(current) => current < moment().startOf('day')}
          value={moment(dataForm?.delivery_date)}
          format={'DD-MMM-YYYY'}
          required
        />
      </Col>
      <Col span={8}>
        <DebounceSelect
          type="select"
          label="Salesman"
          placeholder="Select"
          disabled={isEditPage}
          value={dataForm?.salesman_id}
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
          value={dataForm?.customer_ref}
          onChange={(e: any) => {
            onChangeForm('customer_ref', e.target.value)
          }}
        />
      </Col>
      <Col span={8}></Col>
    </Row>
  )
}
