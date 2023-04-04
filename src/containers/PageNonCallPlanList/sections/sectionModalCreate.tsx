import { Col, Modal, Row, Typography } from 'antd'
import React from 'react'
import { Button, DatePickerInput } from 'pink-lava-ui'
import { fieldBranchAll, fieldCompanyList } from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import moment from 'moment'
import { useSFANonCallPlanListContext } from '../states'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessSubmit } from './alerts'
import SectionLoader from './sectionLoader'

export default function SectionModalCreate() {
  const {
    state: { formCreateNonCallPlan, showModal, confirm },
    handler: { showConfirm, onChangeFormCreateNonCallPlan },
  } = useSFANonCallPlanListContext()

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
      <Typography.Title level={3}>Create Non Call Plan List</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <DebounceSelect
            type="select"
            required
            label="Company"
            placeholder={'Select'}
            value={formCreateNonCallPlan.company_id || ''}
            fetchOptions={fieldCompanyList}
            onChange={(e) => onChangeFormCreateNonCallPlan('company_id', e.value)}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            type="select"
            required
            label="Branch"
            placeholder={'Select'}
            value={formCreateNonCallPlan.branch_id || ''}
            fetchOptions={fieldBranchAll}
            onChange={(e) => onChangeFormCreateNonCallPlan('branch_id', e.value)}
          />
        </Col>
        <Col span={12}>
          <DatePickerInput
            fullWidth
            onChange={(e) => {
              if (e !== null) {
                onChangeFormCreateNonCallPlan(
                  'generate_date',
                  new Date(moment(e).format()).toISOString(),
                )
              }
            }}
            label="Generate Date"
            disabledDate={(current) => current < moment().startOf('day')}
            value={moment(formCreateNonCallPlan.generate_date)}
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
