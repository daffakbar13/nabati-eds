import React, { useState, useEffect } from 'react'
import { Text, DatePickerInput } from 'pink-lava-ui'
import { ICFilterAddFolder } from 'src/assets'
import { FilterOption, OptionType } from 'src/configs/filterType'
import { CommonSelectValue } from 'src/configs/commonTypes'
import moment from 'moment'
import DebounceSelect from '../DebounceSelect'
import { Container } from './styledComponent'
import OptionTypeIcon from './OptionIcon'

export default function SingleFilter({ option: opt, onChange, funcApi, isDate }) {
  const [fromValue, setFromValue] = useState<CommonSelectValue>(opt?.fromValue)
  const [toValue, setToValue] = useState<CommonSelectValue>(opt?.toValue)
  const [optionType, setOptionType] = useState<OptionType>(opt?.option)

  const onChangeTypeIcon = (icon: OptionType) => setOptionType(icon)
  const onChangeFromValue = (e: CommonSelectValue) => {
    const label = e?.label
    const value = e?.value
    setFromValue(value ? { label, value } : null)
  }
  const onChangeToValue = (e: CommonSelectValue) => {
    const label = e?.label
    const value = e?.value
    setToValue(value ? { label, value } : null)
  }

  useEffect(() => {
    onChange({ ...opt, fromValue, toValue, option: optionType })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromValue, optionType, toValue])

  return (
    <Container>
      <Text width="fluid" variant="headingSmall" textAlign="right" style={{ fontSize: 16 }}>
        {opt.label}
      </Text>
      <OptionTypeIcon option={opt.option} onChange={onChangeTypeIcon} />
      {isDate ? (
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            setFromValue({ key: val, label: val, value: val })
          }}
          label={''}
          defaultValue={moment(opt.fromValue)}
          format={'DD-MMM-YYYY'}
        />
      ) : (
        <DebounceSelect
          type="select"
          value={opt.fromValue}
          placeholder="Type To Search"
          {...(funcApi && { fetchOptions: funcApi })}
          onChange={onChangeFromValue}
        />
      )}
      <Text width="fluid" variant="headingSmall" textAlign="center" style={{ fontSize: 16 }}>
        to
      </Text>
      {isDate ? (
        <DatePickerInput
          fullWidth
          onChange={(val: any) => {
            setToValue({ key: val, label: val, value: val })
          }}
          label={''}
          defaultValue={moment(opt.toValue)}
          format={'DD-MMM-YYYY'}
        />
      ) : (
        <DebounceSelect
          type="select"
          value={opt.toValue}
          placeholder="Type To Search"
          {...(funcApi && { fetchOptions: funcApi })}
          onChange={onChangeToValue}
        />
      )}
      <ICFilterAddFolder />
    </Container>
  )
}
