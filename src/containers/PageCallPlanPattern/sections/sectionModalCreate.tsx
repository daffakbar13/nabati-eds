import { Col, Modal, Row, Typography } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import {
  fieldDivisionID,
  fieldNewSalesmanDivision,
  // fieldSalesmanID,
} from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import { useSFACallPlanPatternContext } from '../states'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessSubmit } from './alerts'
import SectionLoader from './sectionLoader'

export default function SectionModalCreate() {
  const {
    state: { showModal, confirm },
    handler: { showConfirm },
  } = useSFACallPlanPatternContext()

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
            // value={editable.division_id || ''}
            fetchOptions={fieldDivisionID}
            // onChange={(e) => handleEditable({ ...editable, division_id: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            type="select"
            required
            label="Branch"
            placeholder={'Select'}
            // value={editable.salesman_id || ''}
            // fetchOptions={isModalCreate ? fieldNewSalesmanDivision : fieldSalesmanID}
            fetchOptions={fieldNewSalesmanDivision}
            // onChange={(e) => handleEditable({ ...editable, salesman_id: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Salesman ID"
            placeholder={'Select'}
            // value={editable.division_id || ''}
            fetchOptions={fieldDivisionID}
            // onChange={(e) => handleEditable({ ...editable, division_id: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            type="select"
            required
            label="Customer ID"
            placeholder={'Select'}
            // value={editable.salesman_id || ''}
            // fetchOptions={isModalCreate ? fieldNewSalesmanDivision : fieldSalesmanID}
            fetchOptions={fieldNewSalesmanDivision}
            // onChange={(e) => handleEditable({ ...editable, salesman_id: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Cycle"
            placeholder={'Select'}
            // value={editable.division_id || ''}
            fetchOptions={fieldDivisionID}
            // onChange={(e) => handleEditable({ ...editable, division_id: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            type="select"
            required
            label="Visit Day"
            placeholder={'Select'}
            // value={editable.salesman_id || ''}
            // fetchOptions={isModalCreate ? fieldNewSalesmanDivision : fieldSalesmanID}
            fetchOptions={fieldNewSalesmanDivision}
            // onChange={(e) => handleEditable({ ...editable, salesman_id: e.value })}
          />
        </Col>
        <Col span={12}>
          <DebounceSelect
            // disabled={!isModalCreate}
            type="select"
            required
            label="Status"
            placeholder={'Select'}
            // value={editable.division_id || ''}
            fetchOptions={fieldDivisionID}
            // onChange={(e) => handleEditable({ ...editable, division_id: e.value })}
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
