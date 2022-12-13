/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { Col, InputNumber, Row, Select } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React from 'react'
import { useRouter } from 'next/router'

interface PaginationProps {
  page: number
  limit: number
  defaultPageSize: number
  pageSizeOptions: number[]
  total: number
  totalPage: number
  onChange: (page, limit) => void
}

export default function Pagination(props: PaginationProps) {
  const { defaultPageSize, onChange, pageSizeOptions, page, limit, total, totalPage } = props
  // const [limit, setLimit] = React.useState<number>(defaultPageSize)
  // const [page, setPage] = React.useState<number>(1)
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
      // setPage((curr) => --curr)
      onChange(page - 1, limit)
    }
  }

  function handleNextPage() {
    if (!isLastPage) {
      // setPage((curr) => ++curr)
      onChange(page + 1, limit)
    }
  }

  function handleChangeLimit(value: number, passFromParams: boolean = false) {
    if (pageSizeOptions.includes(value)) {
      onChange(1, value)
    }
  }

  function handleChangePage(value: number) {
    if (value > 0 && value <= totalPage) {
      onChange(value, limit)
    }
  }

  function VerticalMiddle({ children, style }: { children?; style? }) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          ...style,
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <Row justify="space-between" style={{ fontWeight: '600', margin: '20px 0' }}>
      <Row gutter={10}>
        <Col>
          <VerticalMiddle>Items per page</VerticalMiddle>
        </Col>
        <Col>
          <Select
            size="small"
            value={limit}
            style={styleSelect}
            options={pageSizeOptions.map((e) => ({ label: e, value: e }))}
            onChange={(e) => handleChangeLimit(e)}
          />
        </Col>
        <Col>
          <VerticalMiddle>
            Showing {range} of {total} items
          </VerticalMiddle>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col>
          <InputNumber
            size="small"
            value={page}
            style={styleSelect}
            min={1}
            max={totalPage}
            onChange={(e) => handleChangePage(e)}
          />
        </Col>
        <Col>
          <VerticalMiddle>of {totalPage} Pages</VerticalMiddle>
        </Col>
        <Col>
          <VerticalMiddle>
            <Row justify="space-between" gutter={10}>
              <Col>
                <VerticalMiddle>
                  <LeftOutlined
                    onClick={handleBackPage}
                    style={{ fontSize: 16, ...(isFirstPage && { color: 'grey' }) }}
                  />
                </VerticalMiddle>
              </Col>
              <Col>
                <VerticalMiddle>
                  <RightOutlined
                    onClick={handleNextPage}
                    style={{ fontSize: 16, ...(isLastPage && { color: 'grey' }) }}
                  />
                </VerticalMiddle>
              </Col>
            </Row>
          </VerticalMiddle>
        </Col>
      </Row>
    </Row>
  )
}
