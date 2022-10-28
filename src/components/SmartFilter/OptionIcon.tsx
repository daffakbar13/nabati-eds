import React, { useState, useEffect } from 'react'
import { Tooltip } from 'pink-lava-ui'

import { FILTER_TYPES, OptionTypes } from 'src/configs/filterType'
import DefineSelectOptionModal from './DefineSelectOptionModal'
import { Pane } from './styledComponent'

function OptionIcon({ option, onChange, ...props }) {
  const [showDefineSelectModal, setDefineSelectModal] = useState(false)
  const [iconType, setIconType] = useState<OptionTypes>(option)

  useEffect(() => {
    onChange(iconType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconType])

  return (
    <>
      <Pane {...props}>
        <Tooltip
          overlayInnerStyle={{ width: 'fit-content' }}
          color="#F4FBFC"
          title="Define Select Option"
        >
          <div onClick={() => setDefineSelectModal(true)}>{FILTER_TYPES[iconType].icon}</div>
        </Tooltip>
      </Pane>
      <DefineSelectOptionModal
        visible={showDefineSelectModal}
        onCancel={() => setDefineSelectModal(false)}
        onOk={(type: OptionTypes) => setIconType(type)}
      />
    </>
  )
}

export default OptionIcon
