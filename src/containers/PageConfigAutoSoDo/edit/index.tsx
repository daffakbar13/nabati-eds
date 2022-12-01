import React, { useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text } from 'pink-lava-ui'
import { fakeApi } from 'src/api/fakeApi'
import DebounceSelect from 'src/components/DebounceSelect'
import { Radio } from 'antd'

type Props = {
  visible: boolean
  selectedUpdateData: any
  handleClose: () => void
}

export default function ModalUpdate(props: Props) {
  const handleClose = () => {
    props.handleClose()
  }

  const [value, setValue] = useState('Yes')

  const options = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]

  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Sales Org"
        required
        type="select"
        fetchOptions={fakeApi}
        onChange={(val: any) => {}}
      />
      <Spacer size={10} />
      <Text
        variant="headingSmall"
        textAlign="center"
        style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
      >
        Execute Do ?
      </Text>
      <Radio.Group
        options={options}
        value={value}
        onChange={(e: any) => {
          console.log(e?.target?.value)
          setValue(e?.target?.value)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect label="Notes" type="input" onChange={(val: any) => {}} />
    </>
  )

  return (
    <>
      <Modal
        open={props.visible}
        onOk={() => {}}
        onCancel={handleClose}
        title="Create SLoc Customer Group"
        content={content}
        cancelText="Cancel"
        okText="Submit"
      />
    </>
  )
}
