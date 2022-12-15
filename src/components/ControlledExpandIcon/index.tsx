import React, { useState } from 'react'
import { ExpandMinusIc, ExpandPlusIc } from 'src/assets'

export default function ControlledExpandIcon({
  style = {},
  expanded = true,
  onChange = (e: boolean) => {},
}) {
  return (
    <div style={{ cursor: 'pointer', ...style }} onClick={() => onChange(!expanded)}>
      {expanded ? <ExpandPlusIc /> : <ExpandMinusIc />}
    </div>
  )
}
