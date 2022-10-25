import React, { useState, useEffect } from 'react'
import { Text } from 'pink-lava-ui'
import { ICFilterAddFolder } from 'src/assets'
import { fakeApi } from 'src/api/fakeApi'
import { FilterOption, OptionTypes } from 'src/configs/filterType'
import { CommonSelectValue } from 'src/configs/commonTypes'
import DebounceSelect from '../DebounceSelect'
import { Container } from './styledComponent'
import OptionTypeIcon from './OptionIcon'

export default function SingleFilter({ option: opt, onChange }) {
  const [fromValue, setFromValue] = useState<CommonSelectValue>(opt.fromValue)
  const [toValue, setToValue] = useState<CommonSelectValue>(opt.toValue)
  const [optionType, setOptionType] = useState<OptionTypes>(opt.option)

  const onChangeTypeIcon = (icon: OptionTypes) => setOptionType(icon)
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
      <DebounceSelect
        allowClear
        value={opt.fromValue}
        placeholder="Type To Search"
        fetchOptions={fakeApi}
        onChange={onChangeFromValue}
      />
      <Text width="fluid" variant="headingSmall" textAlign="center" style={{ fontSize: 16 }}>
        to
      </Text>
      <DebounceSelect
        value={opt.toValue}
        placeholder="Type To Search"
        fetchOptions={fakeApi}
        onChange={onChangeToValue}
      />
      <ICFilterAddFolder />
    </Container>
  )
}