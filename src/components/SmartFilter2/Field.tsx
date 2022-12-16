import React from 'react'
import { Text } from 'pink-lava-ui'
import { Container } from './styledComponent'
import SelectOptionIcon from './OptionIcon'

const checkIsEvent = (obj: any) => !!obj?.target

// Jika hanya 1 children, maka hanya return from_value
// Jika ada 2 children, maka children pertama return from_value, children kedua return to_value
// Jika lebih dari 2 children, hanya 2 children yang di render

export default function SingleField({
  options = [],
  label = '',
  children,
  handleChange = (a: any) => {},
  value = { option: '', fromValue: '', toValue: '' },
  field,
  dataType,
}) {
  const hasMultipleChildren = Array.isArray(children)
  const hasOneChildren = !hasMultipleChildren
  const hasNoChildren = !!children

  if (!hasNoChildren) {
    throw new Error(
      'Smart FIlter wajib memiliki children Input, Select, TextArea, atau Date picker',
    )
  }

  const onFromValueChange = (val: any) => {
    const isEvent = checkIsEvent(val) // Input return event instead of value
    handleChange({
      field,
      dataType,
      fromValue: isEvent ? val.target.value : val,
      option: value?.option || options[0],
    })
  }

  const onToValueChange = (val: any) => {
    const isEvent = checkIsEvent(val) // Input return event instead of value
    handleChange({
      field,
      dataType,
      toValue: isEvent ? val.target.value : val,
      option: value?.option || options[0],
    })
  }

  const onOptionChange = (val: any) => {
    handleChange({ field, dataType, option: val })
  }

  return (
    <Container>
      <Text width="fluid" variant="headingSmall" textAlign="right" style={{ fontSize: 16 }}>
        {label}
      </Text>
      <SelectOptionIcon options={options} onChange={onOptionChange} value={value?.option} />

      {hasOneChildren &&
        React.cloneElement(children, {
          ...children.props,
          style: { ...children.props.style, gridColumnStart: 'span 3' },
          onChange: (...arg: any) => {
            onFromValueChange(arg)
            children.props.onChange(arg)
          },
          value: value?.fromValue || undefined,
        })}

      <>
        {hasMultipleChildren && (
          <>
            {React.cloneElement(children[0], {
              ...children[0].props,
              // onChange: onFromValueChange,
              onChange: (...arg: any) => {
                onFromValueChange(arg)
                children[0].props.onChange(arg)
              },
              value: value?.fromValue || undefined,
            })}
            <Text width="fluid" variant="headingSmall" textAlign="center" style={{ fontSize: 16 }}>
              to
            </Text>
            {React.cloneElement(children[1], {
              ...children[1].props,
              // onChange: onToValueChange,
              onChange: (...arg: any) => {
                onToValueChange(arg)
                children[0].props.onChange(arg)
              },
              value: value?.toValue || undefined,
            })}
          </>
        )}
      </>
    </Container>
  )
}
