import styled from 'styled-components'
import { Fragment, useEffect, useState } from 'react'
import { Col, Row, Divider, Select, Radio } from 'antd'
import { Card } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Picker } from '../elements'
import moment from 'moment'
import { fieldBranchAll, fieldChannelCompany, fieldRegion } from 'src/configs/fieldFetches'
import { FilterValueObj } from 'src/components/SmartFilter2'

const StyledSelect = styled(Select)`
  width: 102%;
  padding: 5px 0px;
  border-top: 1px solid #aaa;
  border-left: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
`

export default function FilterSection({
  dateFilter = true,
  selectFilter = true,
  onDateChange,
  onFilterChange,
}: {
  dateFilter?: boolean
  selectFilter?: boolean
  onDateChange?: (dates: any) => any
  onFilterChange?: (filters: FilterValueObj[]) => any
}) {
  const [pickerType, setPickerTypeValue] = useState<'hour' | 'day' | 'week' | 'month'>('month')
  const [filterValues, setFilterValues] = useState<FilterValueObj[]>([])

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

    onFilterChange(updatedValues)
    return setFilterValues(updatedValues)
  }

  console.log(filterValues)

  const arr = new Array(6)

  return (
    <Fragment>
      <Card>
        {dateFilter && (
          <Row justify="end">
            <Col span={4}>
              <StyledSelect
                size="large"
                onChange={setPickerTypeValue}
                defaultValue={pickerType}
                options={['Hour', 'Day', 'Week', 'Month'].map((value) => ({
                  label: value,
                  value: value.toLowerCase(),
                }))}
              />
            </Col>

            <Col span={8}>
              <Picker
                type={pickerType}
                onChange={(date) => {
                  if (date && date[0] && date[1]) {
                    onDateChange(date)
                  } else {
                    onDateChange([moment().startOf('month'), moment().endOf('month')])
                  }
                }}
              />
            </Col>
          </Row>
        )}

        {dateFilter && selectFilter && <Divider style={{ borderColor: '#aaa' }} />}

        <Row gutter={16}>
          {/* <Col span={4}>
            <DebounceSelect
              type="select"
              placeholder="Bussines Unit"
              fetchOptions={fieldRegion}
              onChange={(e) =>
                handleChange({
                  field: 'bussiness_id',
                  option: 'EQ',
                  fromValue: e.value,
                })
              }
              style={{ borderRadius: 24 }}
            />
          </Col> */}
          <Col span={4}>
            <DebounceSelect
              type="select"
              placeholder="Region"
              fetchOptions={fieldRegion}
              onChange={(e) =>
                handleChange({
                  field: 'region_id',
                  option: 'EQ',
                  fromValue: e.value,
                })
              }
              style={{ borderRadius: 24 }}
            />
          </Col>
          <Col span={4}>
            <DebounceSelect
              type="select"
              placeholder="Branch"
              fetchOptions={fieldBranchAll}
              onChange={(e) =>
                handleChange({
                  field: 'branch_id',
                  option: 'EQ',
                  fromValue: e.value,
                })
              }
              style={{ borderRadius: 24 }}
            />
          </Col>
          <Col span={4}>
            <DebounceSelect
              type="select"
              placeholder="Channel"
              fetchOptions={fieldChannelCompany}
              onChange={(e) =>
                handleChange({
                  field: 'channel_id',
                  option: 'EQ',
                  fromValue: e.value,
                })
              }
              style={{ borderRadius: 24 }}
            />
          </Col>
          {/* <Col span={4}>
            <DebounceSelect
              type="select"
              placeholder="Outlet Type"
              fetchOptions={fieldRegion}
              onChange={(e) =>
                handleChange({
                  field: 'outlet_id',
                  option: 'EQ',
                  fromValue: e.value,
                })
              }
              style={{ borderRadius: 24 }}
            />
          </Col> */}
          {/* <Col span={4}>
            <DebounceSelect
              type="select"
              placeholder="SKU"
              fetchOptions={fieldRegion}
              onChange={(e) =>
                handleChange({
                  field: 'sku_ud',
                  option: 'EQ',
                  fromValue: e.value,
                })
              }
              style={{ borderRadius: 24 }}
            />
          </Col> */}
        </Row>
      </Card>
    </Fragment>
  )
}
