import { useRouter } from 'next/router'
import { Button, DatePickerInput, Row, Spacer, Table, Text, Switch, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card, SearchQueryParams, Select, SelectMasterData, SmartFilter } from 'src/components'
import { PATH } from 'src/configs/menus'
import { ExclamationBrownIc } from 'src/assets'

import { getListStockAdjustment, checkIsFreezeList } from 'src/api/logistic/stock-adjustment'
import { useTable, useFilters } from 'src/hooks'
import { columns } from './columns'
import { colors } from 'src/configs/colors'

import FreezeSlocModal from './modals/freezeSloc'
import Pagination from 'src/components/Pagination'

export default function PageStockAdjustment() {
  const [freezeModal, setFreezeModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const goToDetailPage = (id: string) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    router.push(`${PATH.LOGISTIC}/stock-adjustment/detail/${id}`)

  const table = useTable({
    funcApi: getListStockAdjustment,
    columns: columns(goToDetailPage),
  })

  const hasData = table.state.total > 0

  const { filters, oldfilters, setFilters, filterId, setFilterId } = useFilters(table)

  const [freezeList, setFreezeList] = useState([])
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const res = await checkIsFreezeList()
        setFreezeList(res.data || [])
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }
    fetch()
  }, [])

  console.log('hasdata', hasData)

  return (
    <>
      <Text variant={'h4'}>Stock Adjustment</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <Search
              autofocus
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search by Id"
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ fontWeight: 'bold', marginRight: 8 }}>Freeze Sloc?</p>
              <Switch
                onChange={(e) => setFreezeModal(true)}
                checked={freezeList.length > 0}
                disabled={loading}
              />
            </div>
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

      {freezeList.map((i) => (
        <div
          key={i.id}
          style={{
            marginBottom: 10,
            color: '#B78101',
            background: '#FFFBDF',
            borderRadius: 8,
            padding: '8px 16px',
            display: 'grid',
            gridTemplateColumns: '30px 1fr',
          }}
        >
          <ExclamationBrownIc />
          <p>{`Branch ${i.branch_id}-${i.branch_name}, SLoc ${i.id} ${i.name} is being frezee.`}</p>
        </div>
      ))}

      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...table.state.tableProps} />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
      </Card>

      <FreezeSlocModal
        isListFreezed={freezeList.length > 0}
        visible={freezeModal}
        close={() => setFreezeModal(false)}
      />
    </>
  )
}
