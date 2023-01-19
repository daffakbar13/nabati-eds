/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
import { Popover, Row } from 'antd'
import React from 'react'
import { Search, Button } from 'pink-lava-ui'
import { colors } from 'src/configs/colors'
import { DownOutlined, DragOutlined, SaveOutlined } from '@ant-design/icons'
import { createShipment } from 'src/api/shipment'
import { useSalesShipmentCreateContext } from '../states'

export default function SectionAction() {
  const {
    state: { dataSelected, canSave, showFilter, showMore, totalSize, isOverLoad, dataForm },
    handler: {
      runProcess,
      stopProcess,
      showConfirm,
      handleShowDND,
      handleShowMore,
      handleShowFilter,
      handleShipmentID,
    },
  } = useSalesShipmentCreateContext()

  const submitedShipment = (status_id: number) => ({
    branch_id: 'P104',
    total_volume: Number(totalSize),
    status_id: status_id.toString(),
    ...dataForm,
    vehicle_id: dataForm.vehicle_id.split(' - ')[0],
  })

  const moreContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      {canSave && (
        <div
          style={{
            display: 'flex',
            gap: 5,
            cursor: 'pointer',
            verticalAlign: 'center',
          }}
          onClick={() => {
            runProcess('Wait For Submit Shipment')
            createShipment(submitedShipment(6))
              .then((result) => {
                handleShipmentID(result.data.ShipmentID)
                stopProcess()
                showConfirm('submit-success')
              })
              .catch(() => stopProcess())
          }}
        >
          <div>
            <SaveOutlined />
          </div>
          Save As Draft
        </div>
      )}
      <div
        style={{ display: 'flex', gap: 5, cursor: 'pointer', verticalAlign: 'center' }}
        onClick={() => {
          handleShowDND(true)
          handleShowMore(false)
        }}
      >
        <div>
          <DragOutlined />
        </div>
        Arrange DO
      </div>
    </div>
  )
  return (
    <Row justify="space-between">
      <div style={{ display: 'flex', gap: 10 }}>
        <Search
          width="380px"
          nameIcon="SearchOutlined"
          placeholder="Search Menu Design Name"
          colorIcon={colors.grey.regular}
          onChange={() => {}}
        />
        <Button
          size="big"
          variant="tertiary"
          style={{ borderColor: '#88888888', color: 'black', fontWeight: 'normal' }}
          onClick={() => handleShowFilter(!showFilter)}
        >
          Filter
        </Button>
        {/* <SmartFilter onOk={setFilters} filters={filters} /> */}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button size="big" variant="tertiary" onClick={() => showConfirm('cancel')}>
          Cancel
        </Button>
        <Popover placement="bottom" content={moreContent} trigger="click" open={showMore}>
          <Button
            size="big"
            variant="secondary"
            onClick={() => {
              handleShowMore(!showMore)
            }}
            disabled={dataSelected.length === 0}
            style={{ gap: 5 }}
          >
            More <DownOutlined />
          </Button>
        </Popover>
        <Button
          size="big"
          variant="primary"
          disabled={!canSave}
          onClick={() => {
            runProcess('Wait For Submit Shipment')
            createShipment(submitedShipment(1))
              .then((result) => {
                handleShipmentID(result.data.ShipmentID)
                stopProcess()
                showConfirm('submit-success')
              })
              .catch(() => runProcess(''))
          }}
        >
          Create
        </Button>
      </div>
    </Row>
  )
}
