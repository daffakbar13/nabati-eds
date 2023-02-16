import styled from 'styled-components'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

const StyledDatePicker = styled(RangePicker)`
  width: 100%;
  height: 100%;
  border: 1px solid #aaa;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;

  .ant-picker-separator {
    ::before {
      margin-left: -4px;
      color: #aaa;
      content: 'To';
    }

    span[role='img'] {
      display: none;
    }
  }
`

export default function Picker({ type, onChange }) {
  if (type === 'hour') return <StyledDatePicker showTime onChange={onChange} />
  if (type === 'day') return <StyledDatePicker onChange={onChange} />
  return <StyledDatePicker picker={type} onChange={onChange} />
}
