import React from 'react'
import { ExpandMinusIc, ExpandPlusIc } from 'src/assets'

export default function ControlledExpandIcon({
  style = {},
  expanded = true,
  // eslint-disable-next-line no-unused-vars
  onChange = (e: boolean) => {},
}) {
  return (
    <div style={{ cursor: 'pointer', ...style }} onClick={() => onChange(!expanded)}>
      {expanded ? <ExpandPlusIc /> : <ExpandMinusIc />}
    </div>
  )
}
