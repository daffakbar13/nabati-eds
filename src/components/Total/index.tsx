import React from 'react'
import { TotalProps } from './types'

export default function Total(props: TotalProps) {
  const { label, value, largeSize } = props

  return (
    <div style={{ display: 'flex', justifyContent: 'end', gap: 10 }}>
      {/* start::label */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {largeSize ? (
          <h2>
            <b>{label}</b>
          </h2>
        ) : (
          <h3>
            <b>{label}</b>
          </h3>
        )}
      </div>
      {/* end::label */}
      {/* start::value */}
      <div
        style={{
          width: 289,
          backgroundColor: '#F4F4F4',
          borderRadius: 8,
          padding: largeSize ? '16px 20px' : '12px 16px',
          border: '1px solid #AAAAAA',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'end' }}>{value}</div>
      </div>
      {/* end::value */}
    </div>
  )
}
