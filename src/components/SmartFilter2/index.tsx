import React, { useState, useRef, useEffect } from 'react'
import { Button, Row, Modal } from 'pink-lava-ui'
import { ICFilter } from 'src/assets'
import { generateFilterBody } from 'src/utils/misc'
import Field from './Field'
import moment from 'moment'

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

  useEffect(() => {
    if (oldFilter) {
      const FilterOld = oldFilter.map((item: any, index) => {
        return {
          field: item.field,
          dataType: item.dataType,
          fromValue: item.field.includes('date')
            ? moment(item.from_value)
            : {
                label: item.from_value_label,
                value: item.from_value,
                key: item.from_value,
              },
          toValue: item.field.includes('date')
            ? moment(item.to_value)
            : {
                label: item.to_value_label,
                value: item.to_value,
                key: item.to_value,
              },
          option: item.option,
        }
      })
      console.log('filter old', FilterOld)
      setFilterValues(FilterOld)
    }
  }, [oldFilter])

  const content = (
    <div style={{ paddingBottom: 20 }}>
      {React.Children.map(
        children,
        (child) => (
          console.log('filter content', filterValues),
          (
            <>
              {React.cloneElement(child, {
                ...child.props,
                key: child.field,
                value: filterValues.find((f) => f.field === child.props.field),
                handleChange,
              })}
            </>
          )
        ),
      )}
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
