import { Col, Modal, Row, Typography } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import {
  fieldCustomer,
  fieldNewSalesmanDivision,
  fieldCompanyList,
  fieldBranchAll,
} from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import { useSFACallPlanPatternContext } from '../states'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessSubmit } from './alerts'
import SectionLoader from './sectionLoader'

export default function SectionModalCreate() {
  const {
    state: { showModal, confirm, showValue },
    handler: { showConfirm, handleShowValue },
  } = useSFACallPlanPatternContext()

  const callPlanPatternCycleDay = [
    {
      label: 'M1',
      value: '1',
    },
    {
      label: 'M2C13',
      value: '2',
    },
    {
      label: 'M2C24',
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

  const callPlanPatternIsActive = [
    {
      label: 'Active',
      value: '1',
    },
    {
      label: 'Inactive',
      value: '0',
    },
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
          showConfirm('submit')
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
            value={showValue.company_id || ''}
            fetchOptions={fieldCompanyList}
            onChange={(e) => handleShowValue({ ...showValue, company_id: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            type="select"
            required
            label="Branch"
            placeholder={'Select'}
            value={showValue.branch_id || ''}
            // fetchOptions={isModalCreate ? fieldNewSalesmanDivision : fieldSalesmanID}
            fetchOptions={fieldBranchAll}
            onChange={(e) => handleShowValue({ ...showValue, branch_id: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Salesman ID"
            placeholder={'Select'}
            value={showValue.salesman_id || ''}
            fetchOptions={fieldNewSalesmanDivision}
            onChange={(e) => handleShowValue({ ...showValue, salesman_id: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            type="select"
            required
            label="Customer ID"
            placeholder={'Select'}
            value={showValue.customer_id || ''}
            // fetchOptions={isModalCreate ? fieldNewSalesmanDivision : fieldSalesmanID}
            fetchOptions={fieldCustomer}
            onChange={(e) => handleShowValue({ ...showValue, customer_id: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Cycle"
            placeholder={'Select'}
            value={showValue.cycle || ''}
            //fetchOptions={fieldDivisionID}
            options={callPlanPatternCycleDay}
            onChange={(e) => handleShowValue({ ...showValue, cycle: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Visit Day"
            placeholder={'Select'}
            value={showValue.visit_day || ''}
            //fetchOptions={fieldDivisionID}
            options={callPlanPatternVisitDay}
            onChange={(e) => handleShowValue({ ...showValue, visit_day: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Status"
            placeholder={'Select'}
            value={showValue.is_active || ''}
            //fetchOptions={fieldDivisionID}
            options={callPlanPatternIsActive}
            onChange={(e) => handleShowValue({ ...showValue, is_active: e.value })}
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
