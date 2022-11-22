import React from 'react'
import { TotalProps } from './types'

export default function Total(props: TotalProps) {
  const { label, value, largeSize, currency } = props

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
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'start' }}>{currency || 'IDR'}</div>
        <div style={{ display: 'flex', justifyContent: 'end', flexGrow: 1 }}>
          {value.toLocaleString()}
        </div>
      </div>
      {/* end::value */}
    </div>
  )
}
