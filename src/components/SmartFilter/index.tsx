import React, { useState, useCallback, useRef, useMemo } from 'react'
import { FilterOption } from 'src/configs/filterType'
import { Button, Row, Modal } from 'pink-lava-ui'
import { ICFilter } from 'src/assets'
import { fieldBranch, fieldQuotationType, fieldSalesOrg, fieldShipToCustomer, fieldSoldToCustomer } from 'src/configs/fieldFetches'
import SingleFilter from './SingleFilter'

interface FILTER_TYPE {
  SALES_ORG?: 'sales_org_id'
  BRANCH?: 'branch_id'
  SOLD_TO_CUSTOMER?: 'sold_to_customer_id'
  SHIP_TO_CUSTOMER?: 'ship_to_customer_id'
  ORDER_TYPE?: 'order_type_id'
  ORDER_DATE?: 'order_date'
}
export const FILTER: FILTER_TYPE = {
  SALES_ORG: 'sales_org_id',
  BRANCH: 'branch_id',
  SOLD_TO_CUSTOMER: 'sold_to_customer_id',
  SHIP_TO_CUSTOMER: 'ship_to_customer_id',
  ORDER_TYPE: 'order_type_id',
  ORDER_DATE: 'order_date',
}

const defaultFilterOptions: FilterOption[] = [
  {
    field: 'sales_org_id',
    label: 'Sales Organization',
    option: 'LE',
    dataType: 'S',
    searchApi: fieldSalesOrg,
  },
  {
    field: 'branch_id',
    label: 'Branch',
    option: 'EQ',
    dataType: 'S',
    searchApi: fieldBranch,
  },
  {
    field: 'sold_to_customer_id',
    label: 'Sold to Customer',
    option: 'LE',
    dataType: 'S',
    searchApi: fieldSoldToCustomer,
  },
  {
    field: 'ship_to_customer_id',
    label: 'Ship to Customer',
    option: 'LT',
    dataType: 'S',
    searchApi: fieldShipToCustomer,
  },
  {
    field: 'order_type_id',
    label: 'Order type',
    option: 'GT',
    dataType: 'S',
    searchApi: fieldQuotationType,
  },
  {
    field: 'order_date',
    label: 'Order Date',
    option: 'GE',
    dataType: 'S',
    isDate: true,
  },
]

const getFiltersConfig = (a: string[]) => {
  const res = a.map((current) => defaultFilterOptions.find((opt) => opt.field === current))
  return res
}

export const useSmartFilters = (configs: string[]) => {
  const [filters, setFilters] = useState(getFiltersConfig(configs))
  return { filters, setFilters }
}

function SmartFilter({ filters, onOk }) {
  const previousValue = useMemo(() => [...filters], [filters])
  const [currentValue, setCurrentFilter] = useState<FilterOption[]>(filters)
  const [filtered, setFiltered] = React.useState({})

  const [showFilter, setShowFilter] = useState(false)

  const onChangeOption = useCallback(
    (newObj: FilterOption) => {
      const index = currentValue.findIndex((o) => o.field === newObj.field)
      const newOptions = [...currentValue]
      newOptions[index] = { ...newOptions[index], ...newObj }
      setCurrentFilter(newOptions)
      // setFiltered({
      //   ...filtered,
      //   field: `eds_order.${newObj.field}`,
      //   option: newObj.option,
      //   from_value: newObj.fromValue,
      // })
    },
    [currentValue, filtered],
  )

  const handleApply = () => {
    onOk(currentValue)
    setShowFilter(false)
  }

  const resetToPrevious = () => {
    setCurrentFilter(previousValue)
  }

  const clearAllValue = () => {
    onOk(currentValue)
    setCurrentFilter(currentValue.map((f) => ({ ...f, fromValue: null, toValue: null })))
  }

  const close = () => {
    resetToPrevious()
    setShowFilter(false)
  }

  const content = (
    <div style={{ paddingBottom: 20 }}>
      {currentValue.map((opt: FilterOption) => (
        <SingleFilter
          key={opt.field}
          option={opt}
          onChange={onChangeOption}
          funcApi={opt.searchApi}
          isDate={opt?.isDate}
        />
      ))}

      <Row gap="16px" reverse>
        <Button onClick={handleApply}>Apply</Button>
        <Button variant="tertiary" onClick={clearAllValue}>
          Clear All
        </Button>
      </Row>
    </div>
  )

  return (
    <>
      <Button
        size="big"
        variant="tertiary"
        onClick={() => setShowFilter(true)}
        style={{
          border: '1px solid #888888',
          color: '#888888',
          backgroundColor: 'white',
          justifyContent: 'flex-start',
          gap: 16,
        }}
      >
        <ICFilter /> Filter
      </Button>
      <Modal
        visible={showFilter}
        title="Filter"
        onCancel={close}
        width={880}
        footer={false}
        content={content}
      />
    </>
  )
}

export default SmartFilter
