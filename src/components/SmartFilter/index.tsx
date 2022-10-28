import React, { useState, useCallback, useEffect } from 'react'
import { FilterOption } from 'src/configs/filterType'
import SingleFilter from './SingleFilter'

function SmartFilter({ defaultOptions, onChange }) {
  const [options, setOptions] = useState<FilterOption[]>(defaultOptions)

  const onChangeOption = useCallback(
    (newObj: FilterOption) => {
      const index = options.findIndex((o) => o.fields === newObj.fields)
      const newOptions = [...options]
      newOptions[index] = { ...newOptions[index], ...newObj }
      setOptions(newOptions)
    },
    [options],
  )

  useEffect(() => {
    onChange(options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  return (
    <>
      {options.map((opt: FilterOption) => (
        <SingleFilter key={opt.fields} option={opt} onChange={onChangeOption} />
      ))}
    </>
  )
}

export default SmartFilter
