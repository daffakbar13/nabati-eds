import React, { useState } from 'react'
import { ICFilter2 } from 'src/assets'
import { fakeApi } from 'src/api/fakeApi'
import DebounceSelect from '../DebounceSelect'

interface UserValue {
  label: string
  value: string
}

function SmartFilter() {
  const [value, setValue] = useState<UserValue[]>([])

  return (
    <div>
      <ICFilter2 />

      <DebounceSelect
        // mode="multiple"
        value={value}
        placeholder="Select users"
        fetchOptions={fakeApi}
        onChange={(newValue) => {
          setValue(newValue as UserValue[])
        }}
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default SmartFilter
