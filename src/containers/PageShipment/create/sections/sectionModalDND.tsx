/* eslint-disable react-hooks/exhaustive-deps */
import { DragOutlined, ShrinkOutlined } from '@ant-design/icons'
import { Modal, Row } from 'antd'
import React from 'react'
import TitleDataList from 'src/components/TitleDataList'
import { Table } from 'pink-lava-ui'
import { useDrag, useDrop } from 'react-dnd'
import { useSalesShipmentCreateContext } from '../states'
import { useColumnsDeliveryOrder } from '../columns'

interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number
  // eslint-disable-next-line no-unused-vars
  moveRow: (dragIndex: number, hoverIndex: number) => void
}

const type = 'DraggableBodyRow'

const ColumnsDragable = () => {
  const initial = useColumnsDeliveryOrder
  delete initial[0].className
  const dragIcon = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#D5FAFD',
        color: '#2bbecb',
        fontSize: 20,
      }}
    >
      <DragOutlined style={{ flexGrow: 1 }} />
    </div>
  )
  return [
    {
      title: '',
      width: 38,
      fixed: 'left',
      render: () => dragIcon,
      onCell: () => ({ style: { paddingRight: 0 } }),
    },
    ...initial,
  ]
}

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: DraggableBodyRowProps) => {
  const ref = React.useRef<HTMLTableRowElement>(null)
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {}
      if (dragIndex === index) {
        return {}
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      }
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index)
    },
  })
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })
  drop(drag(ref))

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  )
}

const components = { body: { row: DraggableBodyRow } }

export default function SectionModalDND() {
  const {
    state: { table, showDND, dataSelected },
    handler: { handleDataSelected, handleShowDND },
  } = useSalesShipmentCreateContext()

  const buttonProps = {
    style: { backgroundColor: '#f4f4f4f4', padding: 2, fontSize: 18 },
    onClick: () => handleShowDND(!showDND),
  }

  const moveRow = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const arr = [...dataSelected]
      const [ell] = arr.splice(dragIndex, 1)
      arr.splice(hoverIndex, 0, ell)
      handleDataSelected(arr)
    },
    [dataSelected],
  )

  return (
    <Modal open={showDND} closable={false} width={'95vw'} footer={null}>
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
            <ShrinkOutlined {...buttonProps} />
          </div>
        </Row>
        {delete useColumnsDeliveryOrder[0].className}
        <Table
          scroll={{ x: 'max-content', y: 400 }}
          loading={table.state.loading}
          columns={ColumnsDragable()}
          dataSource={dataSelected}
          showSorterTooltip={false}
          components={components}
          onRow={(_, index) => {
            const attr = {
              index,
              moveRow,
            }
            return attr as React.HTMLAttributes<any>
          }}
        />
      </div>
    </Modal>
  )
}
