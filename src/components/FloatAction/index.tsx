import React from 'react'

interface FloatActionProps {
  children?: React.ReactNode
}

export default function FloatAction(props: FloatActionProps) {
  const { children } = props

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '7%',
        left: '50%',
        transform: 'translate(-40%, 0)',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        border: '2px solid #2BBECB',
        width: 780,
        zIndex: 700,
      }}
    >
      <div style={{ display: 'flex' }}>{children}</div>
    </div>
  )
}
