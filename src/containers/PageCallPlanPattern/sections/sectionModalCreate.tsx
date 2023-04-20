import { Col, Form, Modal, Row, Typography, message } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import {
  fieldNewSalesmanDivision,
  fieldCompanyList,
  fieldBranchAll,
  fieldCustomerByID,
} from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import { useSFACallPlanPatternContext } from '../states'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessSubmit } from './alerts'
import SectionLoader from './sectionLoader'

export default function SectionModalCreate() {
  const {
    state: { formCreateCallPlan, showModal, confirm },
    handler: { showConfirm, onChangeFormCreateCallPlan },
  } = useSFACallPlanPatternContext()

  const callPlanPatternCycleDay = [
    {
      label: 'M1',
      value: '1',
    },
    {
      label: 'M2C24',
      value: '2',
    },
    {
      label: 'M2C13',
      value: '3',
    },
  ]

  const callPlanPatternVisitDay = [
    {
      label: 'Monday',
      value: '1',
    },
    {
      label: 'Tuesday',
      value: '2',
    },
    {
      label: 'Wednesday',
      value: '3',
    },
    {
      label: 'Thursday',
      value: '4',
    },
    {
      label: 'Friday',
      value: '5',
    },
    {
      label: 'Saturday',
      value: '6',
    },
    {
      label: 'Sunday',
      value: '7',
    },
  ]

  const handleErrorMessage = (fieldName: string) => {
    message.error(`${fieldName} !`)
  }

  const mandatoryFields = [
    { name: 'Company', value: formCreateCallPlan.company_id },
    { name: 'Branch', value: formCreateCallPlan.branch_id },
    { name: 'Salesman ID', value: formCreateCallPlan.salesman_id },
    { name: 'Customer ID', value: formCreateCallPlan.customer_id },
    { name: 'Cycle', value: formCreateCallPlan.cycle },
    { name: 'Visit Day', value: formCreateCallPlan.visit_day },
  ]

  const footer = (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button
        size="big"
        variant="tertiary"
        style={{ flexGrow: 1 }}
        onClick={() => {
          showConfirm('cancel')
        }}
      >
        Cancel
      </Button>
      <Button
        size="big"
        variant="primary"
        style={{ flexGrow: 1 }}
        onClick={() => {
          const emptyFields = mandatoryFields.filter((field) => !field.value)
          if (emptyFields.length > 0) {
            const fieldNames = emptyFields.map((field) => field.name).join(', ')
            handleErrorMessage(`Please fill in the following mandatory(*) fields: ${fieldNames}`)
          } else {
            onChangeFormCreateCallPlan('is_active', '1')
            showConfirm('submit')
          }
        }}
      >
        Submit
      </Button>
    </div>
  )

  return (
    <Modal open={showModal} closable={false} footer={footer} zIndex={500} width="50vw">
      <Typography.Title level={3}>Create Call Plan Pattern</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Company"
            placeholder={'Select'}
            value={formCreateCallPlan.company_id || ''}
            fetchOptions={fieldCompanyList}
            onChange={(e) => onChangeFormCreateCallPlan('company_id', e.value)}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            type="select"
            required
            label="Branch"
            placeholder={'Select'}
            value={formCreateCallPlan.branch_id || ''}
            // fetchOptions={isModalCreate ? fieldNewSalesmanDivision : fieldSalesmanID}
            fetchOptions={fieldBranchAll}
            onChange={(e) => {
              onChangeFormCreateCallPlan('branch_id', e.value)
            }}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Salesman ID"
            placeholder={'Select'}
            value={formCreateCallPlan.salesman_id || ''}
            fetchOptions={fieldNewSalesmanDivision}
            onChange={(e) => onChangeFormCreateCallPlan('salesman_id', e.value)}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            type="select"
            required
            label="Customer ID"
            placeholder={'Select'}
            value={formCreateCallPlan.customer_id || ''}
            // fetchOptions={isModalCreate ? fieldNewSalesmanDivision : fieldSalesmanID}
            fetchOptions={fieldCustomerByID}
            onChange={(e) => onChangeFormCreateCallPlan('customer_id', e.value)}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Cycle"
            placeholder={'Select'}
            value={formCreateCallPlan.cycle || ''}
            //fetchOptions={fieldDivisionID}
            options={callPlanPatternCycleDay}
            onChange={(e) => onChangeFormCreateCallPlan('cycle', e.value)}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Visit Day"
            placeholder={'Select'}
            value={formCreateCallPlan.visit_day || ''}
            //fetchOptions={fieldDivisionID}
            options={callPlanPatternVisitDay}
            onChange={(e) => onChangeFormCreateCallPlan('visit_day', e.value)}
          />
        </Col>
      </Row>
      {confirm === 'cancel' && <ConfirmCancel />}
      {confirm === 'submit' && <ConfirmSubmit />}
      {confirm === 'success-submit' && <ConfirmSuccessSubmit />}
      <SectionLoader />
    </Modal>
  )
}
