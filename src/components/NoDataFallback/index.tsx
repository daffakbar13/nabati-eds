import React from 'react'
import PeopleIllustration from 'src/assets/ilustration/Vector People.svg'
import { Text } from 'pink-lava-ui'

function NoDataFallback({
  title = 'No Data',
  subtitle = 'Please fill the required field with press + add new button ',
}) {
  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 8, margin: 36 }}>
      <PeopleIllustration />
      <Text variant="headingLarge" style={{ fontWeight: 600 }}>
        {title}
      </Text>
      <Text variant="headingRegular">{subtitle}</Text>
    </div>
  )
}

export default NoDataFallback
