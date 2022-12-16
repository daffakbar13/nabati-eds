/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React from 'react'
import { getCompletedDeliveryOrderList } from 'src/api/shipment'
import { useTable } from 'src/hooks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useColumnsDeliveryOrder } from './columns'
import { useSalesShipmentCreateProvider } from './states'

export default function PageShipmentCreateProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const SalesShipmentCreate = useSalesShipmentCreateProvider()
  const table = useTable({
    funcApi: getCompletedDeliveryOrderList,
    columns: useColumnsDeliveryOrder,
    haveCheckBox: 'All',
  })
  const {
    state: { filter, dataSelected, vehicleSize, totalSize, isOverLoad },
    handler: {
      handleDataSelected,
      handleFilterChanges,
      handleDataSelectedChanges,
      handleOverload,
      handleCanSubmit,
    },
  } = SalesShipmentCreate

  React.useEffect(() => {
    const {
      state: { data, selected },
    } = table
    if (selected.length > 0) {
      const newData = data.filter((d) => selected.includes(d.delivery_order_id))
      handleDataSelected(newData)
    } else {
      handleDataSelected([])
    }
  }, [table.state.selected])

  React.useEffect(() => {
    handleFilterChanges()
    const newBody = [
      {
        field: 'branch_id',
        option: 'EQ',
        from_value: filter.branch.split(' - ')[0],
      },
      {
        field: 'sales_org_id',
        option: 'EQ',
        from_value: filter.sales_org.split(' - ')[0],
      },
    ]
    if (Object.keys(filter).includes('salesman')) {
      newBody.push({
        field: 'salesman_id',
        option: 'EQ',
        from_value: filter.salesman.split(' - ')[0],
      })
    }
    table.handler.handleFilter(newBody)
  }, [filter])

  React.useEffect(() => {
    handleDataSelectedChanges()
  }, [dataSelected])

  React.useEffect(() => {
    handleCanSubmit()
  }, [dataSelected, isOverLoad])

  React.useEffect(() => {
    handleOverload()
  }, [vehicleSize, totalSize])

  return (
    <>
      <SalesShipmentCreate.Provider
        value={{
          state: { ...SalesShipmentCreate.state, table },
          handler: SalesShipmentCreate.handler,
        }}
      >
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </SalesShipmentCreate.Provider>
    </>
  )
}
