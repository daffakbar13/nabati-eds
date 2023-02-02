import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Row, Spacer, Table, Text, Col, Search } from 'pink-lava-ui'
import { Col as ColAntd, Row as RowAntd, Typography, Popover } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import { Card, SearchQueryParams, Modal, Pagination, FloatAction } from 'src/components'
import {
  getListProductIntraChannel,
  deleteProductIntraChannel,
} from 'src/api/logistic/config-mapping-product-intra'
import { useTable } from 'src/hooks'
import { colors } from 'src/configs/colors'
import Popup from 'src/components/Popup'
import { PATH } from 'src/configs/menus'
import { columns } from './columns'

export default function PageConfigSalesORGCustomerGroupMaterial() {
  const [filters, setFilters] = useState([])
  const router = useRouter()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedData, setSelectedData] = useState([])
  const [showConfirm, setShowConfirm] = useState('')

  const goToDetailPage = (row: any) => {
    setSelectedRow(row)
    setShowCreateModal(true)
  }

  const table = useTable({
    funcApi: getListProductIntraChannel,
    columns: columns(goToDetailPage),
  })

  const hasData = table.state.total > 0

  useEffect(() => {
    table.handler.handleFilter(filters)
  }, [filters])

  return (
    <>
      <Text variant={'h4'}>Credit Limit Approval</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search
              autofocus
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search by Trans Type"
              colorIcon={colors.grey.regular}
              onChange={(e) => {
                const idIndex = filters.findIndex((obj) => obj?.field == 'trans_type')
                if (idIndex > -1) {
                  if (e.target.value === '') {
                    setFilters((oldFilter) =>
                      oldFilter.filter((data) => data?.field != 'trans_type'),
                    )
                  } else {
                    const updateId = filters.map((data, i) => {
                      if (i === idIndex) {
                        return { ...data, from_value: `%${e.target.value}%` }
                      }
                      return { ...data }
                    })
                    setFilters(updateId)
                  }
                } else {
                  setFilters([
                    ...filters,
                    {
                      field: 'trans_type',
                      option: 'CP',
                      from_value: `%${e.target.value}%`,
                      data_type: 'S',
                    },
                  ])
                }
              }}
              allowClear
            />
          </Row>
          <Row gap="16px"></Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
      </Card>
    </>
  )
}
