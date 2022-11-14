import React, { useState, useEffect } from 'react'
import { Text } from 'pink-lava-ui'
// import { ICFilterAddFolder } from 'src/assets'
// import { OptionTypes } from 'src/configs/filterType'
// import { CommonSelectValue } from 'src/configs/commonTypes'
// import moment from 'moment'
// import DebounceSelect from '../DebounceSelect'
import { Container } from './styledComponent'
import SelectOptionIcon from './OptionIcon'

export default function SingleFilter({ options, label, children, ...props }) {
  const isMultipleChildren = Array.isArray(children)

  console.log('props', props);
  return (
    <Container>
      <Text width="fluid" variant="headingSmall" textAlign="right" style={{ fontSize: 16 }}>
        {label}
      </Text>
      <SelectOptionIcon options={options} onChange={() => { }} />
      {!isMultipleChildren && React.cloneElement(children, { style: { gridColumnStart: 'span 3' } })}

      <>
        {isMultipleChildren && (
          <>
            {children[0]}
            <Text width="fluid" variant="headingSmall" textAlign="center" style={{ fontSize: 16 }}>
              to
            </Text>
            {children[1]}
          </>
        )}
      </>
    </Container>
  )
}
