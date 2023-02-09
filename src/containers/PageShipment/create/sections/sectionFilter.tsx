import { Col, Row } from 'antd'
import React from 'react'
import { Button, DatePickerInput, Spacer } from 'pink-lava-ui'
import { Card } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import moment from 'moment'
import { useSalesShipmentCreateContext } from '../states'
import { useRouter } from 'next/router'
import { fieldBranch, fieldBranchAll, fieldBranchBySalesOrgId } from 'src/configs/fieldFetches'

export default function SectionAction() {
  const {
    state: { table, options, showFilter, filter },
    handler: { handleFilter, handleChangeFilter, handleClearFilter },
  } = useSalesShipmentCreateContext()

  const router = useRouter()
  const { type } = router.query

  return (
    <>
      {showFilter && (
        <>
          <Card style={{ ...(!showFilter && { display: 'none' }) }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Row gutter={10}>
                <Col span={6}>
                  <DebounceSelect
                    type="select"
                    label="Sales Org."
                    placeholder={'Select'}
                    value={filter?.sales_org}
                    style={{ borderRadius: 64 }}
                    options={
                      type === 'MT'
                        ? [
                            {
                              label: 'PID2 - PMA - MT',
                              value: 'PID2 - PMA - MT',
                              key: 'P104 - PMA Bandung Selatan',
                            },
                          ]
                        : [
                            {
                              label: 'PID1 - PMA - GT',
                              value: 'PID1 - PMA - GT',
                              key: 'P104 - PMA Bandung Selatan',
                            },
                            {
                              label: 'PID2 - PMA - MT',
                              value: 'PID2 - PMA - MT',
                              key: 'P104 - PMA Bandung Selatan',
                            },
                          ]
                    }
                    onChange={(e: any) => {
                      handleFilter({ ...filter, branch: e.key, sales_org: e.value })
                    }}
                  />
                </Col>
                <Col span={6}>
                  <DebounceSelect
                    type="select"
                    label="Branch"
                    placeholder={'Select'}
                    value={filter?.branch}
                    style={{ borderRadius: 64 }}
                    fetchOptions={type === 'MT' && fieldBranchBySalesOrgId}
                    // options={
                    //   type !== 'MT' && [
                    //     {
                    //       label: 'P104 - PMA Bandung Selatan',
                    //       value: 'P104 - PMA Bandung Selatan',
                    //       key: 'PID1 - PMA - GT',
                    //     },
                    //   ]
                    // }
                    onChange={(e: any) => {
                      handleFilter({ ...filter, branch: e.value, sales_org: e.key })
                    }}
                  />
                </Col>
                <Col span={6}>
                  <DebounceSelect
                    type="select"
                    label="Salesman"
                    placeholder={'Select'}
                    value={filter?.salesman}
                    style={{ borderRadius: 64 }}
                    options={filter.branch === '' ? [] : options.salesman}
                    onChange={(e: any) => {
                      handleChangeFilter('salesman', e.value)
                    }}
                  />
                </Col>
                <Col span={6}>
                  <DatePickerInput
                    fullWidth
                    onChange={() => {}}
                    label="Created Date"
                    value={moment(filter?.created_date)}
                    format={'DD-MMM-YYYY'}
                    style={{ borderRadius: 64 }}
                    required
                  />
                </Col>
              </Row>
              <Row gutter={10} justify="end">
                <Col span={6}>
                  <Button
                    size="big"
                    style={{ width: '100%' }}
                    variant="tertiary"
                    disabled={Object.keys(filter || {}).length === 0}
                    onClick={() => {
                      handleClearFilter()
                      table.handler.handleSelected([])
                    }}
                  >
                    Clear All
                  </Button>
                </Col>
                {/* <Col span={6}>
                  <Button
                    size="big"
                    style={{ width: '100%' }}
                    variant="primary"
                    disabled={Object.keys(filter || {}).length === 0}
                    onClick={() => {
                      const newBody = []
                      if (Object.keys(filter || {}).includes('salesman')) {
                        newBody.push({
                          field: 'salesman_id',
                          option: 'EQ',
                          from_value: filter.salesman.split(' - ')[0],
                        })
                      }
                      newBody.push(
                        ...[
                          {
                            field: 'branch_id',
                            option: 'EQ',
                            from_value: filter.branch.split(' - ')[0],
                          },
                          {
                            field: 'sales_org_id',
                            option: 'EQ',
                            from_value: filter.sales_org.split(' - ')[0],
                          },
                        ],
                      )
                      table.handler.handleFilter(newBody)
                      handleShowContent(true)
                    }}
                  >
                    Search
                  </Button>
                </Col> */}
              </Row>
            </div>
          </Card>
          <Spacer size={10} />
        </>
      )}
    </>
  )
}
