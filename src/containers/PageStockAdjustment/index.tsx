import { useRouter } from 'next/router'
import { Button, DatePickerInput, Row, Spacer, Table, Text, Switch } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import { Card, SearchQueryParams, Select, SelectMasterData, SmartFilter } from 'src/components'
import { PATH } from 'src/configs/menus'
import { ExclamationBrownIc } from 'src/assets'

import { getListStockAdjustment, checkIsFreezeList } from 'src/api/logistic/stock-adjustment'
import { useSimpleTable } from 'src/hooks'
import { columns } from './columns'

import FreezeSlocModal from './modals/freezeSloc'

export default function PageStockAdjustment() {
  const [filters, setFilters] = useState([])
  const [freezeModal, setFreezeModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const goToDetailPage = (id: string) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    router.push(`${PATH.LOGISTIC}/stock-adjustment/detail/${id}`)

  const tableProps = useSimpleTable({
    funcApi: getListStockAdjustment,
    columns: columns(goToDetailPage),
    filters,
  })

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

  return (
    <>
      <Text variant={'h4'}>Stock Adjustment</Text>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justifyContent="space-between">
          <Row gap="16px">
            <SearchQueryParams />
            <SmartFilter onOk={setFilters}>
              <SmartFilter.Field
                field="company_id"
                dataType="S"
                label="Company ID"
                options={['EQ', 'NB', 'NP', 'GT', 'LT']}
              >
                <SelectMasterData type="COMPANY" />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Branch ID"
                options={['EQ', 'NB', 'NP', 'GT', 'LT']}
              >
                <SelectMasterData type="PLANT" />
              </SmartFilter.Field>
              <SmartFilter.Field field="sloc_id" dataType="S" label="Sloc" options={['EQ', 'NB']}>
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
              </SmartFilter.Field>
              <SmartFilter.Field field="status_data" dataType="S" label="Status" options={['EQ']}>
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
            color: '#B78101',
            background: '#FFFBDF',
            borderRadius: 8,
            padding: '8px 16px',
            display: 'grid',
            gridTemplateColumns: '30px 1fr',
          }}
        >
          <ExclamationBrownIc />
          <p>{`Branch ${i.branch_id}-${i.branch_id}, SLoc ${i.id} ${i.name} is being frezee.`}</p>
        </div>
      ))}

      <Spacer size={10} />
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...tableProps} />
        </div>
      </Card>

      <FreezeSlocModal
        isListFreezed={freezeList}
        visible={freezeModal}
        close={() => setFreezeModal(false)}
      />
    </>
  )
}
