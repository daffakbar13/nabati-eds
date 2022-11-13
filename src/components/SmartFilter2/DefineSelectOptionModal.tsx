import React, { useState } from 'react'
import { Text, Modal, Button } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'

import { FILTER_TYPES } from 'src/configs/filterType'
import { FooterPane, List, HeaderList } from './styledComponent'

function DefineSelectOptionModal({ visible, onCancel, onOk }) {
  const [value, setValue] = useState<string>()

  const onClickSave = () => {
    onOk(value)
    onCancel()
  }
  return (
    <Modal
      title="Define Select Option"
      visible={visible}
      onCancel={onCancel}
      footer={
        <FooterPane>
          <Button variant="tertiary">Reset</Button>
          <Button onClick={onClickSave}>Save</Button>
        </FooterPane>
      }
      content={
        <>
          <HeaderList>
            <Text variant="headingLarge" style={{ fontSize: 16, justifySelf: 'center' }}>
              Selection
            </Text>
            <Text variant="headingLarge" style={{ fontSize: 16 }}>
              Description
            </Text>
          </HeaderList>
          {Object.values(FILTER_TYPES).map((type) => (
            <List key={type.code} active={type.code === value} onClick={() => setValue(type.code)}>
              <div style={{ justifySelf: 'center' }}>{type.icon}</div>
              <Text variant="headingSmall" style={{ fontSize: 16 }}>
                {type.label}
              </Text>
              {type.code === value && <CheckCircleFilled style={{ color: '#00d458' }} />}
            </List>
          ))}
        </>
      }
    />
  )
}

export default DefineSelectOptionModal
