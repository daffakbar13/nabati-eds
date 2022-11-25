import React from 'react'

interface PaperA4Props {
  children?: React.ReactNode
}

export default function PaperA4(props: PaperA4Props) {
  const { children } = props

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        padding: 20,
        width: 1122.5,
        zoom: 793.7 / 1122.5,
        backgroundColor: 'white',
      }}
    >
      {children}
    </div>
  )
}
