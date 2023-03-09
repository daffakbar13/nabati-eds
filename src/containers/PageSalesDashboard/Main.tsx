import { Radio } from 'antd'
import { Fragment } from 'react'
import { Card } from 'src/components'
import { FilterSection } from './components'

export default function Main() {
  return (
    <Fragment>
      <FilterSection />
      <Card>
        <Radio.Group defaultValue={'Day'} size="large" style={{ marginBottom: 8 }}>
          <Radio.Button value="Day" style={{ borderRadius: '16px 0 0 16px' }}>
            Day
          </Radio.Button>
          <Radio.Button value="Week">Week</Radio.Button>
          <Radio.Button value="Month">Month</Radio.Button>
        </Radio.Group>
      </Card>
    </Fragment>
  )
}
