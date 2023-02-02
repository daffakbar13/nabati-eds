import React, { useState } from 'react'
import { Search, Spacer, Text, Table, DatePickerInput, Button } from 'pink-lava-ui'
import { Card, FloatAction, Loader, SmartFilter } from 'src/components'
import { colors } from 'src/configs/colors'
import useTable from 'src/hooks/useTable'
import useTitlePage from 'src/hooks/useTitlePage'
import {
  confirmUndelivered,
  downloadUndelivered,
  getUndeliveredDetail,
  getUndeliveredList,
  multipleSubmitUndelivered,
} from 'src/api/undelivered'
import Pagination from 'src/components/Pagination'
import { fieldSalesOrganization, fieldBranchAll, fieldCustomer } from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import { useFilters } from 'src/hooks'
import { Col, Row } from 'antd'
import { TableUndelivered } from './columns'
import ConfirmReject from './alerts/ConfirmReject'
import ConfirmApprove from './alerts/ConfirmApprove'
import ConfirmSuccessApprove from './alerts/ConfirmSuccessApprove'
import ConfirmSuccessReject from './alerts/ConfirmSuccessReject'

export default function PageUndelivered() {
  const table = useTable({
    funcApi: getUndeliveredList,
    // haveCheckBox: 'All',
    columns: TableUndelivered,
  })

  const [showConfirm, setShowConfirm] = useState<
    'reject' | 'approve' | 'success-approve' | 'success-reject' | ''
  >('')
  const [proccessing, setProccessing] = React.useState('')

  const titlePage = useTitlePage('list')
  const { oldfilters, setFilters, searchProps } = useFilters(table, 'Search Shipment ID')
  const statusOption = [
    { label: 'All', value: null },
    { label: 'New', value: 'New' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Complete', value: 'Complete' },
    { label: 'Cancel', value: 'Cancel' },
  ]

  const handleCancelSelectedAction = () => {
    table.handler.handleSelected([])
    setShowConfirm('')
  }

  const handleApprove = (date: any) => {
    setProccessing('Wait for approving')

    Promise.all(
      table.state.selected.map((item) => {
        getUndeliveredDetail({ id: item })
          .then((res: any) => ({
            shipment_id: item,
            delivery_data:
              res.data?.item?.length > 0
                ? res.data.item.map((detail) => ({
                  delivery_id: detail?.delivery_oder_id,
                  delivery_date: date,
                  is_delivery: 1,
                  cancelation_reason_id: '',
                }))
                : [],
          }))
          .catch(() => ({
            shipment_id: item,
            delivery_data: [],
          }))
      }),
    )
      .then(() => {
        setShowConfirm('success-approve')
        setProccessing('')
      })
      .catch(() => {
        setProccessing('')
      })

    // setTimeout(() => {
    //   setShowConfirm('success-approve')
    // }, 2000)
    // setTimeout(() => {
    //   setProccessing('')
    // }, 3000)
  }

  const handleReject = (reason: string) => {
    setProccessing('Wait for rejecting')

    Promise.all(
      table.state.selected.map((item) => {
        getUndeliveredDetail({ id: item })
          .then((res: any) => ({
            shipment_id: item,
            delivery_data:
              res.data.item?.length > 0
                ? res.data.item.map((detail) => ({
                  delivery_id: detail?.delivery_oder_id,
                  delivery_date: detail?.order_date,
                  is_delivery: 0,
                  cancelation_reason_id: reason,
                }))
                : [],
          }))
          .catch(() => ({
            shipment_id: item,
            delivery_data: [],
          }))
      }),
    )
      .then(() => {
        setShowConfirm('success-reject')
        setProccessing('')
      })
      .catch(() => {
        setProccessing('')
      })

    // setTimeout(() => {
    //   setShowConfirm('success-reject')
    // }, 2000)
    // setTimeout(() => {
    //   setProccessing('')
    // }, 3000)
  }

  const handleSycnData = () => {
    setShowConfirm('')
    table.handler.handleSelected([])
    table.handler.getApi(getUndeliveredList)
  }

  return (
    <Col>
      <Text variant={'h4'}>{titlePage}</Text>
      <Spacer size={20} />
      <Card>
        <Row justify="space-between">
          <Row gutter={16}>
            <Col>
              <Search {...searchProps} />
            </Col>
            <Col>
              <SmartFilter onOk={setFilters} oldFilter={oldfilters}>
                <SmartFilter.Field
                  field="sales_org"
                  dataType="S"
                  label="Sales Organization"
                  options={['EQ', 'NE', 'BT', 'NB']}
                >
                  <DebounceSelect type="select" fetchOptions={fieldSalesOrganization} />
                  <DebounceSelect type="select" fetchOptions={fieldSalesOrganization} />
                </SmartFilter.Field>
                <SmartFilter.Field
                  field="branch"
                  dataType="S"
                  label="Branch"
                  options={['EQ', 'NE', 'BT', 'NB']}
                >
                  <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                  <DebounceSelect type="select" fetchOptions={fieldBranchAll} />
                </SmartFilter.Field>
                <SmartFilter.Field
                  field="ship_to_customer"
                  dataType="S"
                  label="Sold to Customer"
                  options={['EQ', 'NE', 'BT', 'NB']}
                >
                  <DebounceSelect type="select" fetchOptions={fieldCustomer} />
                  <DebounceSelect type="select" fetchOptions={fieldCustomer} />
                </SmartFilter.Field>
                {/* <SmartFilter.Field
              field="order_type"
              dataType="S"
              label="Order Type"
              options={['EQ', 'NE', 'BT', 'NB']}
            >
              <DebounceSelect type="select" options={optionsOrderType} />
              <DebounceSelect type="select" options={optionsOrderType} />
            </SmartFilter.Field> */}
                <SmartFilter.Field
                  field="order_date"
                  dataType="S"
                  label="Creating Date"
                  options={['GE', 'EQ', 'LE', 'GT', 'LT', 'NE']}
                >
                  <DatePickerInput
                    label={''}
                    fullWidth
                    format={'DD-MMM-YYYY'}
                    placeholder="Creating Date"
                  />
                  <DatePickerInput
                    fullWidth
                    label={''}
                    format={'DD-MMM-YYYY'}
                    placeholder="Creating Date"
                  />
                </SmartFilter.Field>
                <SmartFilter.Field
                  field="status"
                  dataType="S"
                  label="Status"
                  options={['EQ', 'NE', 'BT', 'NB']}
                >
                  <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
                  <DebounceSelect type="select" placeholder={'Select'} options={statusOption} />
                </SmartFilter.Field>
              </SmartFilter>
            </Col>
          </Row>
          <Col>
            <Button
              size="big"
              variant="secondary"
              onClick={() => {
                setProccessing('Please wait')
                downloadUndelivered({
                  filters: oldfilters,
                  limit: table.state.limit,
                  page: table.state.page,
                })
                  .then((res) => {
                    console.log(res)
                    setProccessing('')
                  })
                  .catch((err) => {
                    console.log(err)
                    setProccessing('')
                  })
              }}
            >
              Download
            </Button>
          </Col>
        </Row>
      </Card>
      <Spacer size={10} />
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ overflow: 'scroll' }}>
          <Table {...table.state.tableProps} rowKey={'shipment_id'} />
        </div>
        {table.state.data.length > 0 && <Pagination {...table.state.paginationProps} />}
      </Card>
      {table.state.selected.length > 0 && (
        <FloatAction>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <b>{table.state.selected.length} Document Shipment are Selected</b>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
            <Button size="small" variant="secondary" onClick={() => setShowConfirm('reject')}>
              Cancel Proccess
            </Button>
            <Button size="small" variant="primary" onClick={() => setShowConfirm('approve')}>
              Confirm
            </Button>
          </div>
        </FloatAction>
      )}

      {showConfirm === 'reject' && (
        <ConfirmReject onCancel={handleCancelSelectedAction} onSubmit={handleReject} />
      )}
      {showConfirm === 'approve' && (
        <ConfirmApprove
          selectedItems={table.state.selected}
          onCancel={handleCancelSelectedAction}
          onSubmit={handleApprove}
        />
      )}
      {showConfirm === 'success-approve' && (
        <ConfirmSuccessApprove selectedItems={table.state.selected} onOk={handleSycnData} />
      )}
      {showConfirm === 'success-reject' && (
        <ConfirmSuccessReject selectedItems={table.state.selected} onOk={handleSycnData} />
      )}
      {proccessing && <Loader type="process" text={proccessing} />}
    </Col>
  )
}
