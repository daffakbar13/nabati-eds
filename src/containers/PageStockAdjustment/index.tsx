import { useRouter } from 'next/router'
import { Button, DatePickerInput, Row, Spacer, Table, Text, Switch } from 'pink-lava-ui'
import { useState } from 'react'
import { Card, SearchQueryParams, Select, SelectMasterData, SmartFilter } from 'src/components'
import { PATH } from 'src/configs/menus'

import { getListStockAdjustment } from 'src/api/logistic/stock-adjustment'
import { useSimpleTable } from 'src/hooks'
import { columns } from './columns'

import FreezeSlocModal from './modals/freezeSloc'

export default function PageStockAdjustment() {
  const [filters, setFilters] = useState([])
  const [freezeModal, setFreezeModal] = useState(false)
  const router = useRouter()

  const goToDetailPage = (id: string) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    router.push(`${PATH.LOGISTIC}/stock-adjustment/detail/${id}`)

  const tableProps = useSimpleTable({
    funcApi: getListStockAdjustment,
    columns: columns(goToDetailPage),
    filters,
  })

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
              <Switch onChange={(e) => setFreezeModal(true)} />
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
      <Card style={{ padding: '16px 20px', overflow: 'scroll' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table {...tableProps} />
        </div>
      </Card>

      <FreezeSlocModal visible={freezeModal} close={() => setFreezeModal(false)} />
    </>
  )
}
