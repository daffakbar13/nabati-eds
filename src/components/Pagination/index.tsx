import { Select } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React from 'react'

interface PaginationProps {}

export default function Pagination(props: PaginationProps) {
  const {} = props

  const styleSelect = {
    border: '1px solid #AAAAAA',
    borderRadius: 4,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
  }

  function MiddleAlign({ children, style }: { children?; style? }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ...style }}>
        {children}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', fontWeight: '600' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          flexGrow: 1,
          gap: 5,
        }}
      >
        <MiddleAlign>Items per page</MiddleAlign>
        <Select
          size="small"
          value={1}
          style={styleSelect}
          options={[
            {
              value: '1',
              label: '1',
            },
            {
              value: '2',
              label: '2',
            },
            {
              value: '3',
              label: '3',
            },
          ]}
        />
        <MiddleAlign>Showing 1-20 of 100 items</MiddleAlign>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          flexGrow: 1,
          gap: 5,
        }}
      >
        <Select
          size="small"
          value={1}
          style={styleSelect}
          options={[
            {
              value: '1',
              label: '1',
            },
            {
              value: '2',
              label: '2',
            },
            {
              value: '3',
              label: '3',
            },
          ]}
        />
        <MiddleAlign>of 10 Pages</MiddleAlign>
        <div style={{ display: 'flex', gap: 10, marginLeft: 10, cursor: 'pointer' }}>
          <MiddleAlign>
            <LeftOutlined />
          </MiddleAlign>
          <MiddleAlign>
            <RightOutlined />
          </MiddleAlign>
        </div>
      </div>
    </div>
  )
}
