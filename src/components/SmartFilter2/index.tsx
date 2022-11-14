import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { FilterOption } from 'src/configs/filterType'
import { Button, Row, Modal } from 'pink-lava-ui'
import { ICFilter } from 'src/assets'
import { fieldBranch, fieldQuotationType, fieldSalesOrg, fieldShipToCustomer, fieldSoldToCustomer } from 'src/configs/fieldFetches'
import Field from './Field'

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
    // searchApi: fieldBranch,
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

export const useSmartFilters = () => {
  const [filterValues, onChange] = useState()

  console.log('filterValues', filterValues);

  return { filterValues, onChange }
}

function FilterButton({ onClick }) {
  return (<Button size="big" variant="tertiary" onClick={onClick} style={{
    border: '1px solid #888888',
    color: '#888888',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    gap: 16,
  }}>
    <ICFilter /> Filter
  </Button>);
}

function SmartFilter({ filterValues, onChange, children }) {
  const initialValues = children.length ? children.map((c) => c.props).map((c) => ({
    field: c.field,
    fromValue: '',
    toValue: '',
    option: c.options[0],
    dataType: c.dataType,
  })) : ''

  const [showFilter, setShowFilter] = useState(false)
  const [temporaryValues, setTemporaryValues] = useState(initialValues)

  const handleApply = () => {

  }

  const resetToPrevious = () => {
  }

  const clearAllValue = () => {
  }

  const close = () => {
    setShowFilter(false)
  }

  const content = (
    <div style={{ paddingBottom: 20 }}>
      {/* {children} */}
      {
        React.Children.map(children, (
          child,
        ) => React.cloneElement(child, {
          fromValue: 'adasds',
          toValue: 'ads',
          option: 'asd',
          className: `${child.props.className} img-special-class`,
        }))
      }
      <Row gap="16px" reverse>
        <Button onClick={() => { }}>Apply</Button>
        <Button variant="tertiary" onClick={() => { }}>
          Clear All
        </Button>
      </Row>
    </div>
  )

  useEffect(() => {
    if (filterValues) return
    onChange(initialValues)
  }, [filterValues, initialValues, onChange])

  return (
    <>
      <FilterButton onClick={() => setShowFilter(true)} />
      <Modal
        destroyOnClose
        visible={showFilter}
        title="Filter"
        onCancel={close}
        width={880}
        footer={false}
        content={content}
        maskClosable={false}
      />
    </>
  )
}

const Single = (props: any) => <Field {...props} />

SmartFilter.Field = Single
export default SmartFilter