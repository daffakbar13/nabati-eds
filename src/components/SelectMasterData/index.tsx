/* eslint-disable*/
import { Empty, Select } from 'antd'
import { Spin } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { MASTER_DATA_TYPES } from './config'

interface Props {
  type: 'PLANT' | 'MATERIAL' | 'SLOC' | 'COMPANY' | 'UOM' | 'PO_NUMBER' // TO DO tambah lagi nanti..
  style?: any
  onChange?: (a: any) => any
  disabled?: boolean
  value?: any
  loading?: boolean
  defaultValue?: { value: any; label: string }
}

export default function SelectMasterData({ type, style = {}, onChange, ...props }: Props) {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true)
        const res = await MASTER_DATA_TYPES[type].api()
        const opt = MASTER_DATA_TYPES[type].responseHandler(res)
        setOptions(opt)
        setLoading(false)
      }
      fetchData()
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }, [type])

  return (
    <div
      id="masterDataPlant"
      // eslint-disable-next-line max-len
      style={{ ...style }} // !DON'T DELETE THIS. Because there is style injection in SmartFilter by React.clone method. It would cause styling error at SmartFilter
    >
      <Select
        className="masterDataSelect"
        labelInValue
        allowClear
        showSearch
        loading={loading}
        notFoundContent={loading ? <Spin /> : <Empty />}
        optionFilterProp="children"
        size="large"
        placeholder={MASTER_DATA_TYPES[type].placeholder}
        getPopupContainer={() => document.getElementById('masterDataPlant')}
        filterOption={(input, option) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
          option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        style={{
          display: 'grid',
          border: '1px solid #AAAAAA',
          borderRadius: 8,
          width: '100%',
          minHeight: 48,
          overflow: 'hidden',
        }}
        onChange={onChange}
        {...props}
      >
        {options.map((opt) => (
          <Select.Option value={opt.value} key={opt.key ?? opt.value}>
            {opt.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}
