import { useRouter } from 'next/router'
import { Button, DatePickerInput, Row, Spacer, Table, Text, Switch, Search } from 'pink-lava-ui'
import { useState, useEffect } from 'react'
import {
  Card,
  FloatAction,
  Loader,
  Modal,
  Popup,
  SearchQueryParams,
  Select,
  SelectMasterData,
  SmartFilter,
} from 'src/components'
import { PATH } from 'src/configs/menus'
import { ExclamationBrownIc } from 'src/assets'

import { checkIsFreezeList } from 'src/api/logistic/stock-adjustment'
import { useTable, useFilters } from 'src/hooks'
import { colors } from 'src/configs/colors'

import Pagination from 'src/components/Pagination'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll, fieldSlocFromBranch, fieldCompanyList } from 'src/configs/fieldFetches'
import FreezeSlocModal from './modals/freezeSloc'
import { columns } from './columns'
import {
  approvalStockOpname,
  freezeSlocIdByBranchId,
  getDetailStockOpname,
  getListApprovalStockOpname,
  updateStatusStockOpname,
} from 'src/api/logistic/stock-opname'
import { Input, Typography } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import { Label } from 'src/components/Text'

import moment from 'moment'

export default function PageApprovalStockOpname() {
  const [freezeModal, setFreezeModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [freezeList, setFreezeList] = useState([])
  const [successReject, setSuccessReject] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)
  const [approveModal, setApproveModal] = useState(false)
  const [reason, setReason] = useState('')

  const router = useRouter()

  const goToDetailPage = (id: string) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    router.push(`${PATH.LOGISTIC}/approval-stock-opname/detail/${id}`)

  const table = useTable({
    funcApi: getListApprovalStockOpname,
    haveCheckBox: [{ rowKey: 'status', member: ['Wait Approval Opname'] }],
    columns: columns(goToDetailPage),
  })

  const hasData = table.state.total > 0

  const { filters, oldfilters, setFilters, filterId, setFilterId } = useFilters(table)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const res = await checkIsFreezeList()
        setFreezeList(res.data || [])
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const [selectedStatus, setSelectedStatus] = useState(null)
  const optionsStatus = [
    { label: 'Wait Approval Opname', value: '02' },
    { label: 'Approve', value: '03' },
    { label: 'Rejected', value: '05' },
  ]

  useEffect(() => {
    let newFilters = []
    if (selectedStatus) {
      newFilters = [
        { field: 'status_id', option: 'EQ', from_value: selectedStatus, data_type: 'S' },
      ]
    } else {
      newFilters = [
        { field: 'status_id', option: 'EQ', from_value: '03', data_type: 'S' },
        { field: 'status_id', option: 'EQ', from_value: '02', data_type: 'S' },
        { field: 'status_id', option: 'EQ', from_value: '05', data_type: 'S' },
      ]
    }
    setFilters(newFilters)
  }, [selectedStatus])

  const [branchfrom, setBranchFrom] = useState('')
  const [branchTo, setBranchTo] = useState('')
  const [allSloc, setAllScloc] = useState([])

  useEffect(() => {
    fieldSlocFromBranch(branchfrom, branchTo).then((response) => {
      setAllScloc(response)
    })
  }, [branchfrom, branchTo])

  const handleReject = async () => {
    try {
      setLoading(true)
      await Promise.all(
        table.state.selected.map((id) => {
          getDetailStockOpname({ id }).then((item: any) => {
            const payload = { status_id: '05', header_text: item?.header_text, reason: reason }
            updateStatusStockOpname(id, payload).then((res) => console.log(res))
          })
        }),
      )

      setSuccessReject(true)
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      return false
    }
  }
  const handleApprove = async () => {
    try {
      await Promise.all(
        table.state.selected.map((id) => {
          getDetailStockOpname({ id }).then((item: any) => {
            freezeSlocIdByBranchId(
              {
                id: item?.sloc_id,
                is_freeze: 0,
              },
              item?.branch_id,
            ).then((res) => console.log('FREEZE :', res))

            const payload = {
              company_id: item?.company_id,
              id: item?.id,
              // posting_date: item?.posting_date,
              posting_date: moment(item?.posting_date).format('YYYY-MM-DD'),
              // document_date: item?.document_date,
              document_date: moment(item?.document_date).format('YYYY-MM-DD'),
              branch_id: item?.branch_id,
              sloc_id: item?.sloc_id,
              header_text: item?.header_text,
              items: item?.items?.length
                ? item.items.map((element) => ({
                    product_id: element?.product_id,
                    base_qty: element?.base_qty,
                    movement_type_id: element?.movement_type_id || '',
                  }))
                : [],
            }
            approvalStockOpname(id, payload).then((res) => console.log('APPROVAL :', res))
          })
        }),
      )

      return true
    } catch (error) {
      return false
    }
  }

  return (
    <>
      <Text variant={'h4'}>Approval Stock Opname</Text>
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
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
                <DebounceSelect type="select" fetchOptions={fieldCompanyList} />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="branch_id"
                dataType="S"
                label="Branch ID"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect
                  type="select"
                  fetchOptions={fieldBranchAll}
                  onChange={(val: any) => {
                    setBranchFrom(val.label.split(' - ')[0])
                  }}
                />
                <DebounceSelect
                  type="select"
                  fetchOptions={fieldBranchAll}
                  onChange={(val: any) => {
                    setBranchTo(val.label.split(' - ')[0])
                  }}
                />
              </SmartFilter.Field>
              <SmartFilter.Field
                field="sloc_id"
                dataType="S"
                label="Sloc"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                <DebounceSelect type="select" options={allSloc} />
                <DebounceSelect type="select" options={allSloc} />
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
                field="status_id"
                dataType="S"
                label="Status"
                options={['EQ', 'NE', 'BT', 'NB']}
              >
                {/* <Select options={optionsStatus} />
                <Select options={optionsStatus} /> */}
                <Select
                  options={optionsStatus}
                  value={selectedStatus}
                  // onChange={(value) => setSelectedStatus(value)}
                />
              </SmartFilter.Field>
            </SmartFilter>
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
          <Table {...table.state.tableProps} rowKey="id" />
        </div>
        {hasData && <Pagination {...table.state.paginationProps} />}
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
            <b>{table.state.selected.length} Document Stcok Opname are Selected</b>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
            <Button
              size="big"
              variant="tertiary"
              onClick={() => {
                setRejectModal(true)
              }}
            >
              Reject
            </Button>
            <Button
              size="big"
              variant="primary"
              onClick={() => {
                setApproveModal(true)
              }}
            >
              Approve
            </Button>
          </div>
        </FloatAction>
      )}

      <FreezeSlocModal
        ListFreezed={freezeList}
        isListFreezed={freezeList.length > 0}
        visible={freezeModal}
        close={() => setFreezeModal(false)}
      />

      {rejectModal && (
        <Popup onOutsideClick={() => setRejectModal(false)}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Confirm Rejectation
          </Typography.Title>
          <Label>Reason</Label>
          <Input.TextArea
            id="inputReason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="secondary"
              onClick={() => setRejectModal(false)}
            >
              No
            </Button>
            <Button size="big" style={{ flexGrow: 1 }} variant="primary" onClick={handleReject}>
              Yes
            </Button>
          </div>
        </Popup>
      )}

      {successReject && (
        <Popup>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text
              textAlign="center"
              style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
            >
              <>
                <CheckCircleFilled /> Reject Success
              </>
            </Text>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 4,
              fontWeight: 'bold',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <div>
              Reff. Number :
              <Typography.Text copyable={{ text: table.state.selected.join(', ') as string }}>
                {' '}
                {table.state.selected.join(', ')}
              </Typography.Text>
              has been
            </div>
            <div>successfully rejected</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              size="big"
              style={{ flexGrow: 1 }}
              variant="primary"
              onClick={() => router.reload()}
            >
              OK
            </Button>
          </div>
        </Popup>
      )}

      <Modal
        title="Confirm Approve"
        open={approveModal}
        onOk={handleApprove}
        onCancel={() => setApproveModal(false)}
        onOkSuccess={() => router.reload()}
        content={`Are you sure want to approve? Reff. Number ${table.state.selected.join(', ')}`}
        successOkText="OK"
        successContent={(res: any) => (
          <>
            Reff. Number :
            <Typography.Text copyable={{ text: table.state.selected.join(', ') as string }}>
              {' '}
              {table.state.selected.join(', ')}
            </Typography.Text>{' '}
            has been successfully approved
          </>
        )}
      />

      {loading && <Loader />}
    </>
  )
}
