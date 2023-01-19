/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
import { Col, Empty, Pagination, Popover, Row, Tag } from 'antd'
import React from 'react'
import { Search, Button, Table, Spacer } from 'pink-lava-ui'
import { colors } from 'src/configs/colors'
import {
  ArrowsAltOutlined,
  DownOutlined,
  DragOutlined,
  SaveOutlined,
  ShrinkOutlined,
} from '@ant-design/icons'
import { createShipment } from 'src/api/shipment'
import TitleDataList from 'src/components/TitleDataList'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldVehicle } from 'src/configs/fieldFetches'
import { ICDelete } from 'src/assets'
import { Card } from 'src/components'
import { useSalesShipmentCreateContext } from '../states'
import SectionTableListDo from './sectionTableListDo'

interface DescVehicleProps {
  label: string
  value: string
}

function DescVehicle(props: DescVehicleProps) {
  const { label, value } = props
  return (
    <div>
      <div style={{ color: 'grey' }}>{label}</div>
      <div style={{ fontWeight: 'bold', fontSize: 16 }}>{value}</div>
    </div>
  )
}

export default function SectionSelectedInformation() {
  const {
    state: { table, dataSelected, dataForm, vehicleSize, isOverLoad, totalSize },
    handler: { handleDataForm, handleVehicleSize },
  } = useSalesShipmentCreateContext()

  const handleRemoveItem = (removedItem: string) => {
    table.handler.handleSelected(table.state.selected.filter((e) => e !== removedItem))
  }

  function getTagText() {
    switch (true) {
      case !vehicleSize:
        return 'Vehicle Not Selected'
      case isOverLoad:
        return 'Overload'
      case !isOverLoad:
        return 'Available'
      default:
        return ''
    }
  }

  return (
    <>
      <TitleDataList title="Select Vehicle" />
      <DebounceSelect
        type="select"
        value={dataForm?.vehicle_id as any}
        fetchOptions={fieldVehicle}
        onChange={(e) => {
          handleVehicleSize(parseInt(e.key.split('.').join(''), 10) / 1000)
          handleDataForm({ ...dataForm, vehicle_id: e.value })
        }}
      />
      <Spacer size={10} />
      <Row justify="space-between">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <DescVehicle label="Vehicle Size" value={`${vehicleSize || 0} M³`} />
          <DescVehicle label="Total Size" value={`${totalSize} M³`} />
          <DescVehicle label="Total Delivery Order" value={dataSelected.length.toString()} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Tag color={isOverLoad ? 'red' : 'green'}>{getTagText()}</Tag>
        </div>
      </Row>
      <Spacer size={10} />
      <div style={{ height: 300, overflow: 'auto' }}>
        <table className="eds_create_shipment">
          <thead>
            <tr>
              <th>No.</th>
              <th>Delivery Order</th>
              <th>Size M³</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataSelected.map(({ delivery_order_id, volume }, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td>{delivery_order_id}</td>
                {/* <td>{`${Math.round(volume / 10)} M³`}</td> */}
                <td>{`${(Math.round((volume / 10) * 100) / 100).toFixed(2)} M³`}</td>
                <td>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleRemoveItem(delivery_order_id)}
                  >
                    <ICDelete style={{ margin: 0 }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
