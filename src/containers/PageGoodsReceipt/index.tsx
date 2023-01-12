import { useRouter } from 'next/router'
import { Button, DatePickerInput, Row, Spacer, Table, Text, Search } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, SearchQueryParams, Select, SelectMasterData, SmartFilter } from 'src/components'
import { PATH } from 'src/configs/menus'
import { getGoodReceiptList } from 'src/api/logistic/good-receipt'
import { useTable } from 'src/hooks'
import { useFilters } from 'src/hooks'
import { columns } from './columns'
import { colors } from 'src/configs/colors'

export default function PageGoodsReceipt() {
  const router = useRouter()

  const goToDetailPage = (id: string) => router.push(`${PATH.LOGISTIC}/goods-receipt/detail/${id}`)

  const table = useTable({
    funcApi: getGoodReceiptList,
    columns: columns(goToDetailPage),
  })

  const { filters, oldfilters, setFilters, filterId, setFilterId } = useFilters(table)

  return (
    <>
      <Text variant={'h4'}>Goods Receipt</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search
              autofocus
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search by GR Number"
              colorIcon={colors.grey.regular}
              value={filterId}
              onChange={(e) => {
                setFilterId(e.target.value)
                const idIndex = filters.findIndex((obj) => obj?.field === 'id')
                if (idIndex > -1) {
                  if (e.target.value === '') {
                    setFilters((oldFilter) => oldFilter.filter((data) => data?.field !== 'id'))
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
                      field: 'id',
                      option: 'CP',
                      from_value: `%${e.target.value}%`,
                      data_type: 'S',
                    },
                  ])
                }
              }}
              allowClear
            />
            <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
              <SmartFilter.Field
                field="company_id"
                dataType="S"
                label="Company ID"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <SelectMasterData type="COMPANY" />
                <SelectMasterData type="COMPANY" />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Branch ID"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <SelectMasterData type="PLANT" />
                <SelectMasterData type="PLANT" />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="product_id"
                dataType="S"
                label="Material"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <SelectMasterData type="MATERIAL" />
                <SelectMasterData type="MATERIAL" />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="sloc_id"
                dataType="S"
                label="Sloc"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <SelectMasterData type="SLOC" />
                <SelectMasterData type="SLOC" />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="posting_date"
                dataType="S"
                label="Posting Date"
                options={['GT', 'LT', 'EQ', 'CP']}
              >
                <DatePickerInput
                  label={''}
                  fullWidth
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
                <DatePickerInput
                  label={''}
                  fullWidth
                  format={'DD-MMM-YYYY'}
                  placeholder="Posting Date"
                />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="status_data"
                dataType="S"
                label="Status"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <Select options={[{ label: 'YES', value: 'yes' }]} />
                <Select options={[{ label: 'YES', value: 'yes' }]} />
              </SmartFilter.Field>
            </SmartFilter>
          </Row>
          <Row gap="16px">
            <Button
              size="big"
              variant="primary"
              onClick={() => router.push(`${router.pathname}/create`)}
            >
              Create
            </Button>
          </Row>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
      </Card>
    </>
  )
}
