import { Col, Modal, Row, Typography } from 'antd'
import React from 'react'
import { Button } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldDivisionID } from 'src/configs/fieldFetches'
import { getListProduct } from 'src/api/master-data'
import { createSalesmanDivisionProduct } from 'src/api/salesman-division-product'
import { Loader } from 'src/components'
import { useSalesSalesmanDivisionContext } from '../states'
import { ConfirmCancel, ConfirmSubmit, ConfirmSuccessSubmit } from './alerts'

export default function SectionModalCreate() {
  const {
    state: { editable, showModal, confirm, processing },
    handler: { showConfirm, unShowModal, handleEditable },
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
        onClick={() => showConfirm('submit')}
      >
        Submit
      </Button>
    </div>
  )
  return (
    <Modal open={showModal !== undefined} closable={false} footer={footer} zIndex={500}>
      <Typography.Title level={3}>
        {isModalCreate ? 'Create' : 'View'} Salesman Division Product
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
            label="Product ID"
            placeholder={'Select'}
            value={editable.product_id || ''}
            fetchOptions={(s) =>
              getListProduct({
                filters: [
                  {
                    field: 'eds_product.product_id',
                    option: 'CP',
                    from_value: `%${s}%`,
                  },
                ],
              }).then((res) => {
                const { results } = res.data
                if (results === null) {
                  return []
                }
                return results.map((e) => ({
                  label: e.product_id,
                  value: e.product_id,
                }))
              })
            }
            onChange={(e) => handleEditable({ ...editable, product_id: e.value })}
          />
        </Col>
      </Row>
      {confirm === 'cancel' && <ConfirmCancel />}
      {confirm === 'submit' && <ConfirmSubmit />}
      {confirm === 'success-submit' && <ConfirmSuccessSubmit />}
    </Modal>
  )
}
