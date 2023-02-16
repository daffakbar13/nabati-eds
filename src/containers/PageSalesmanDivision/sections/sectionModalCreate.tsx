import { Col, Modal, Row, Typography } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import {
  fieldDivisionID,
  fieldNewSalesmanDivision,
  fieldSalesmanID,
} from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import { useSalesSalesmanDivisionContext } from '../states'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessSubmit } from './alerts'
import SectionLoader from './sectionLoader'

export default function SectionModalCreate() {
  const {
    state: { editable, showModal, confirm },
    handler: { showConfirm, handleEditable },
  } = useSalesSalesmanDivisionContext()
  const isModalCreate = showModal === 'create'

  const footer = (
    <div style={{ display: 'flex', gap: 10 }}>
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
        disabled={
          Object.keys(editable).filter((e) => {
            const required = ['salesman_id', 'division_id', 'is_active']
            return required.includes(e)
          }).length < 3
        }
        onClick={() => {
          showConfirm('submit')
        }}
      >
        {isModalCreate ? 'Submit' : 'Update'}
      </Button>
    </div>
  )

  React.useEffect(() => {
    const isEntries = Object.keys(editable).includes('is_active')
    if (isModalCreate && !isEntries) {
      handleEditable({ ...editable, is_active: 'Active' })
    }
  }, [editable])

  return (
    <Modal open={showModal !== undefined} closable={false} footer={footer} zIndex={500}>
      <Typography.Title level={3}>
        {isModalCreate ? 'Create' : 'View'} Salesman Division
      </Typography.Title>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <DebounceSelect
            disabled={!isModalCreate}
            type="select"
            required
            label="Division ID"
            placeholder={'Select'}
            value={editable.division_id || ''}
            fetchOptions={fieldDivisionID}
            onChange={(e) => handleEditable({ ...editable, division_id: e.value })}
          />
        </Col>
        <Col span={24}>
          <DebounceSelect
            type="select"
            required
            label="Salesman ID"
            placeholder={'Select'}
            value={editable.salesman_id || ''}
            fetchOptions={isModalCreate ? fieldNewSalesmanDivision : fieldSalesmanID}
            onChange={(e) => handleEditable({ ...editable, salesman_id: e.value })}
          />
        </Col>
        {/* <Col span={24}>
          <DebounceSelect
            type="select"
            required
            label="Status"
            placeholder={'Select'}
            value={(editable.is_active || 'Active') === 'Active' ? 1 : (0 as any)}
            options={[
              { label: 'Active', value: 1 },
              { label: 'Non Active', value: 0 },
            ]}
            onChange={(e) => handleEditable({ ...editable, is_active: e.label })}
          />
        </Col> */}
      </Row>
      {confirm === 'cancel' && <ConfirmCancel />}
      {confirm === 'submit' && <ConfirmSubmit />}
      {confirm === 'success-submit' && <ConfirmSuccessSubmit />}
      <SectionLoader />
    </Modal>
  )
}
