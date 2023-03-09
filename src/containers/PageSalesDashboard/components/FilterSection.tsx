import styled from 'styled-components'
import { Fragment, useState } from 'react'
import { Col, Row, Divider, Select, Radio } from 'antd'
import { Card } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Picker } from '../elements'

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
}: {
  dateFilter?: boolean
  selectFilter?: boolean
}) {
  const [pickerType, setPickerTypeValue] = useState<'hour' | 'day' | 'week' | 'month'>('month')
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
              <Picker type={pickerType} onChange={() => {}} />
            </Col>
          </Row>
        )}

        {dateFilter && selectFilter && <Divider style={{ borderColor: '#aaa' }} />}

        <Row gutter={16}>
          {[1, 1, 1, 1, 1, 1].map((_, i) => (
            <Col key={i} span={4}>
              <DebounceSelect
                type="select"
                placeholder="Handsome People"
                options={[{ label: 'Daffa' }, { label: 'Daffa' }, { label: 'Daffa' }]}
                style={{ borderRadius: 24 }}
              />
            </Col>
          ))}
        </Row>
      </Card>
    </Fragment>
  )
}
