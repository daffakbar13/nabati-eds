import React, { useState, useCallback, useRef, useMemo } from 'react'
import { FilterOption } from 'src/configs/filterType'
import { Button, Row, Modal } from 'pink-lava-ui'
import { ICFilter } from 'src/assets'
import SingleFilter from './SingleFilter'

interface FILTER_TYPE {
  SALES_ORG?: 'sales_org'
  BRANCH?: 'branch'
  SOLD_TO_CUSTOMER?: 'sold_to_customer'
  SHIP_TO_CUSTOMER?: 'ship_to_customer'
  ORDER_TYPE?: 'order_type'
  ORDER_DATE?: 'order_date'
}
export const FILTER: FILTER_TYPE = {
  SALES_ORG: 'sales_org',
  BRANCH: 'branch',
  SOLD_TO_CUSTOMER: 'sold_to_customer',
  SHIP_TO_CUSTOMER: 'ship_to_customer',
  ORDER_TYPE: 'order_type',
  ORDER_DATE: 'order_date',
}

const defaultFilterOptions: FilterOption[] = [
  {
    fields: 'sales_org',
    label: 'Sales Organization',
    option: 'LE',
    dataType: 'S',
  },
  {
    fields: 'branch',
    label: 'Branch',
    option: 'EQ',
    dataType: 'S',
  },
  {
    fields: 'sold_to_customer',
    label: 'Sold to Customer',
    option: 'LE',
    dataType: 'S',
  },
  {
    fields: 'ship_to_customer',
    label: 'Ship to Customer',
    option: 'LT',
    dataType: 'S',
  },
  {
    fields: 'order_type',
    label: 'Order type',
    option: 'GT',
    dataType: 'S',
  },
  {
    fields: 'order_date',
    label: 'Order Date',
    option: 'GE',
    dataType: 'S',
  },
]

const getFiltersConfig = (a: string[]) => {
  const res = a.map((current) => defaultFilterOptions.find((opt) => opt.fields === current))
  return res
}

export const useSmartFilters = (configs: string[]) => {
  const [filters, setFilters] = useState(getFiltersConfig(configs))
  return [filters, setFilters]
}

function SmartFilter({ filters, onOk }) {
  const previousValue = useMemo(() => [...filters], [filters])
  const [currentValue, setCurrentFilter] = useState<FilterOption[]>(filters)

  const [showFilter, setShowFilter] = useState(false)

  const onChangeOption = useCallback(
    (newObj: FilterOption) => {
      const index = currentValue.findIndex((o) => o.fields === newObj.fields)
      const newOptions = [...currentValue]
      newOptions[index] = { ...newOptions[index], ...newObj }
      setCurrentFilter(newOptions)
    },
    [currentValue],
  )

  const handleApply = () => {
    onOk(currentValue)
    setShowFilter(false)
  }

  const resetToPrevious = () => {
    setCurrentFilter(previousValue)
  }

  const clearAllValue = () => {
    setCurrentFilter(currentValue.map((f) => ({ ...f, fromValue: null, toValue: null })))
  }

  const close = () => {
    resetToPrevious()
    setShowFilter(false)
  }

  const content = (
    <div style={{ paddingBottom: 20 }}>
      {currentValue.map((opt: FilterOption) => (
        <SingleFilter key={opt.fields} option={opt} onChange={onChangeOption} />
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
