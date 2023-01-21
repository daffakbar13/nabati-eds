import React, { useState, useRef, useEffect } from 'react'
import { Button, Row, Modal } from 'pink-lava-ui'
import { ICFilter } from 'src/assets'
import { generateFilterBody } from 'src/utils/misc'
import moment from 'moment'
import Field from './Field'

export interface FilterValueObj {
  field: string
  option?: string
  arrayValues?: string[]
  fromValue?: string | []
  toValue?: string | []
  dataType?: string
  value?: any
}

function SmartFilter(props: { onOk; children; oldFilter? }) {
  const { onOk, children, oldFilter } = props
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [filterValues, setFilterValues] = useState<FilterValueObj[]>([])
  const prevValues = useRef<FilterValueObj[]>(filterValues)

  const handleChange = (changedFiledObj: FilterValueObj) => {
    const currentValues = [...filterValues]
    // check is already in the box
    const isExist = currentValues.find((f) => f.field === changedFiledObj.field)
    // if not exist, push
    if (!isExist) return setFilterValues([...currentValues, changedFiledObj])
    // if exist, update
    const updatedValues = currentValues.map((f) => {
      if (f.field === changedFiledObj.field) return { ...f, ...changedFiledObj }
      return { ...f }
    })
    return setFilterValues(updatedValues)
  }

  const handleApply = () => {
    prevValues.current = filterValues
    onOk(generateFilterBody(filterValues))
    setShowFilter(false)
  }

  const clearAllValue = () => {
    setFilterValues([])
  }

  const closeAndSetToPrevValues = () => {
    setShowFilter(false)
    setFilterValues(prevValues.current)
  }

  const getBaseValue = (item: any, type: 'to' | 'from') => ({
    label: item[`${type}_value_label`],
    value: item[`${type}_value`],
    key: item[`${type}_value`],
  })

  useEffect(() => {
    if (oldFilter) {
      const FilterOld = oldFilter.map((item: any) => ({
        field: item.field,
        dataType: item.dataType,
        fromValue: item.field.includes('date') ? moment(item.from_value) : getBaseValue(item, 'to'),
        toValue: item.field.includes('date') ? moment(item.to_value) : getBaseValue(item, 'from'),
        option: item.option,
      }))
      setFilterValues(FilterOld)
    }
  }, [oldFilter])

  const content = (
    <div style={{ paddingBottom: 20 }}>
      {React.Children.map(children, (child) => (
        <>
          {React.cloneElement(child, {
            ...child.props,
            key: child.field,
            value: filterValues.find((f) => f.field === child.props.field),
            handleChange,
          })}
        </>
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
        destroyOnClose
        visible={showFilter}
        title="Filter"
        onCancel={closeAndSetToPrevValues}
        width={880}
        footer={false}
        content={content}
        maskClosable={false}
      />
    </>
  )
}

SmartFilter.Field = Field
export default SmartFilter
