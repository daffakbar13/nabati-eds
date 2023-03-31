import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import { Modal, Row } from 'antd'
import React from 'react'
import { Pagination } from 'src/components'
import TitleDataList from 'src/components/TitleDataList'
import { Table } from 'pink-lava-ui'
import { useSalesShipmentCreateContext } from '../states'

export default function SectionModalListDo() {
  const {
    state: { table, showModalListDO },
    handler: { handleModalListDO },
  } = useSalesShipmentCreateContext()

  const buttonProps = {
    style: { backgroundColor: '#f4f4f4f4', padding: 2, fontSize: 18 },
    onClick: () => handleModalListDO(!showModalListDO),
  }

  return (
    <Modal open={showModalListDO} closable={false} width={'95vw'} footer={null}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Row justify="space-between">
          <TitleDataList title="Select Delivery Order List" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {showModalListDO ? (
              <ShrinkOutlined {...buttonProps} />
            ) : (
              <ArrowsAltOutlined {...buttonProps} />
            )}
          </div>
        </Row>
        <Table {...table.state.tableProps} rowKey={'delivery_order_id'} />
        {table.state.data.length > 0 && <Pagination {...table.state.paginationProps} />}
      </div>
    </Modal>
  )
}
