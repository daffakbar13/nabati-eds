import { Col, Modal, Row, Typography, message } from 'antd'
import React from 'react'
import { Button, DatePickerInput } from 'pink-lava-ui'
import { fieldBranchAll, fieldCompanyList } from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import moment from 'moment'
import { useSFACallPlanListContext } from '../states'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessSubmit } from './alerts'
import SectionLoader from './sectionLoader'

export default function SectionModalCreate() {
  const {
    state: { formCreateCallPlan, showModal, confirm },
    handler: { showConfirm, onChangeFormCreateCallPlan },
  } = useSFACallPlanListContext()

  const handleErrorMessage = (fieldName: string) => {
    message.error(`${fieldName} !`)
  }

  const mandatoryFields = [
    { name: 'Company', value: formCreateCallPlan.company_id },
    { name: 'Branch', value: formCreateCallPlan.branch_id },
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
      <Typography.Title level={3}>Create Call Plan List</Typography.Title>
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
            fetchOptions={fieldBranchAll}
            onChange={(e) => onChangeFormCreateCallPlan('branch_id', e.value)}
          />
        </Col>
        <Col span={12}>
          <DatePickerInput
            fullWidth
            onChange={(e) => {
              if (e !== null) {
                onChangeFormCreateCallPlan(
                  'generate_date',
                  new Date(moment(e).format()).toISOString(),
                )
              }
            }}
            label="Generate Date"
            disabledDate={(current) => current < moment().startOf('day')}
            value={moment(formCreateCallPlan.generate_date)}
            format={'DD-MMM-YYYY'}
            required
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
