/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { InputNumber, Select } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React from 'react'

interface PaginationProps {
  defaultPageSize: number
  pageSizeOptions: number[]
  total: number
  totalPage: number
  onChange: (page, limit) => void
}

export default function Pagination(props: PaginationProps) {
  const { defaultPageSize, onChange, pageSizeOptions, total, totalPage } = props
  const [limit, setLimit] = React.useState(defaultPageSize)
  const [page, setPage] = React.useState(1)
  const [optionsPage, setOptionsPage] = React.useState<{ label: string; value: number }[]>()
  const isFirstPage = page === 1
  const isLastPage = page === totalPage
  const range = `${limit * page - limit + 1}-${isLastPage ? total : limit * page}`

  const styleSelect = {
    border: '1px solid #AAAAAA',
    borderRadius: 4,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    width: 65,
  }

  function handleBackPage() {
    if (!isFirstPage) {
      setPage((curr) => --curr)
    }
  }

  function handleNextPage() {
    if (!isLastPage) {
      setPage((curr) => ++curr)
    }
  }

  function handleChangeLimit(value: number) {
    setLimit(value)
    setPage(1)
  }

  function handleChangePage(value: number) {
    if (value > 0 && value <= totalPage) setPage(value)
  }

  function handleChangeOptionsPage() {
    const newOptionsPage = []
    for (let index = 1; index <= totalPage; index++) {
      newOptionsPage.push({ label: index, value: index })
    }
    setOptionsPage(newOptionsPage)
  }

  function MiddleAlign({ children, style }: { children?; style? }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ...style }}>
        {children}
      </div>
    )
  }

  React.useEffect(() => {
    onChange(page, limit)
    handleChangeOptionsPage()
  }, [page, limit])

  React.useEffect(() => {
    handleChangeOptionsPage()
  }, [totalPage])

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
          value={limit}
          style={styleSelect}
          options={pageSizeOptions.map((e) => ({ label: e, value: e }))}
          onChange={(e) => handleChangeLimit(e)}
        />
        <MiddleAlign>
          Showing {range} of {total} items
        </MiddleAlign>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          flexGrow: 1,
          gap: 5,
        }}
      >
        <InputNumber
          size="small"
          value={page}
          style={styleSelect}
          min={1}
          max={totalPage}
          onChange={(e) => handleChangePage(e)}
        />
        {/* <Select
          size="small"
          value={page}
          style={styleSelect}
          options={optionsPage}
          showSearch
          onChange={(e) => handleChangePage(e)}
        /> */}
        <MiddleAlign>of {totalPage} Pages</MiddleAlign>
        <div style={{ display: 'flex', gap: 10, margin: '0 15px', cursor: 'pointer' }}>
          <MiddleAlign>
            <LeftOutlined onClick={handleBackPage} />
          </MiddleAlign>
          <MiddleAlign>
            <RightOutlined onClick={handleNextPage} />
          </MiddleAlign>
        </div>
      </div>
    </div>
  )
}
