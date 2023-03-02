import { useState, useEffect } from 'react'
import moment from 'moment'
import { Divider, Form, Typography } from 'antd'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { Button, Col, DatePickerInput, Row, Spacer, Table, Text as Title } from 'pink-lava-ui'
import {
  Card,
  Input,
  Modal,
  SelectMasterData,
  Text,
  Select,
  GoBackArrow,
  Loader,
} from 'src/components'
import { useTableAddItem } from './useTableEditable'
import {
  getDetailStockAdjustment,
  updateStockAdjustment,
  checkIsFreezeList,
} from 'src/api/logistic/stock-adjustment'
import useDetail from 'src/hooks/useDetail'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchSupply, fieldSlocByConfigLogistic } from 'src/configs/fieldFetches'
import {
  freezeSlocIdByBranchId,
  getDetailStockOpname,
  updateStatusStockOpname,
  updateStockOpname,
} from 'src/api/logistic/stock-opname'
import { ExclamationBrownIc } from 'src/assets'
import TaggedStatus from 'src/components/TaggedStatus'
import { ICPlus } from 'src/assets'

const { Label, LabelRequired } = Text

export default function UpdateStockOpname() {
  const now = new Date().toISOString()
  const router = useRouter()
  const data: any = useDetail(getDetailStockOpname, { id: router.query.id as string }, false)
  const [form] = Form.useForm()
  const [headerData, setHeaderData] = useState(null)
  const [loading, setLoading] = useState(false)

  const [movementSelected, setMovementSelected] = useState('')
  const tableAddItems = useTableAddItem({
    idbranch: data?.branch_id,
    itemsData: data.items,
    MovementType: movementSelected,
  })

  // Modal
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    setHeaderData(values)
    setShowSubmitModal(true)
  }

  const handleUpdate = async () => {
    const payload: any = {
      header_text: headerData.header_text,
      items: tableAddItems.data.map((i) => ({
        id: i.id,
        product_id: i.product_id,
        base_stock_qty: i.base_stock_qty,
        qty_unit: {
          large: i.actual_l,
          middle: i.actual_m,
          small: i.actual_s,
        },
      })),
    }
    try {
      const res = await updateStockOpname(data.id, payload)
      // await updateStatusStockOpname(router.query.id as string, {
      //   status_id: '03',
      // })
      return res
    } catch (error) {
      const newLocal = false
      return newLocal
    }
  }

  const handleCancel = async () => {
    try {
      const payload = { status_id: '04' }
      await updateStatusStockOpname(router.query.id as string, payload)

      await freezeSlocIdByBranchId(
        {
          id: data?.sloc_id,
          is_freeze: 0,
        },
        data?.branch_id,
      )

      router.push(`${PATH.LOGISTIC}/stock-opname/detail/${router.query.id}`)
      // return res
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      sloc_id: `${data?.sloc_id} - ${data?.sloc_name}`,
      branch_id: `${data?.branch_id} - ${data?.branch_name}`,
      header_text: data?.header_text,
      document_date: moment(data?.document_date).format('YYYY-MM-DD'),
      posting_date: moment(data?.posting_date).format('YYYY-MM-DD'),
    })
  }, [data])

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
      }
    }
    fetch()
  }, [])

  return (
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
        <Col>
          <div style={{ display: 'flex', gap: 5 }}>
            <GoBackArrow to={`${PATH.LOGISTIC}/stock-opname/detail/${router.query.id}`} />
            <Title variant={'h4'}>View Stock Opname {`${router.query.id}`}</Title>
          </div>
          <Spacer size={20} />
          <Card style={{ overflow: 'unset' }}>
            <div style={{ display: 'flex' }}>
              <TaggedStatus status={data?.status} size="h5" />
              {data?.status && data?.status !== 'Rejected' && (
                <div
                  style={{
                    display: 'grid',
                    marginLeft: 'auto',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 12,
                  }}
                >
                  <Button size="big" variant="tertiary" onClick={() => setShowCancelModal(true)}>
                    Cancel Process
                  </Button>
                  <Button size="big" variant="secondary">
                    Print
                  </Button>
                  <Button size="big" variant="primary" onClick={onClickSubmit}>
                    Submit
                  </Button>
                </div>
              )}
              {data?.status && data?.status === 'Rejected' && (
                <div
                  style={{
                    display: 'grid',
                    marginLeft: 'auto',
                    gridTemplateColumns: '1fr',
                    gap: 12,
                  }}
                >
                  <Button size="big" variant="primary" onClick={onClickSubmit}>
                    Submit
                  </Button>
                </div>
              )}
            </div>
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

          <Card style={{ overflow: 'unset', padding: '28px 20px' }}>
            <Form
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              autoComplete="off"
              requiredMark={false}
              scrollToFirstError
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* <Form.Item
                  name="movement_type"
                  style={{ marginTop: -12, marginBottom: 0 }}
                  initialValue={data?.movement_type_id}
                >
                  <DebounceSelect
                    type="select"
                    label="Movement Type"
                    required
                    options={[
                      { label: 'Z71 - GR Phys. Inv', value: 'Z71' },
                      { label: 'Z72 - RE GR Phys. Inv', value: 'Z72' },
                    ]}
                    onChange={(e) => setMovementSelected(e.value)}
                  />
                </Form.Item> */}
                <Form.Item name="branch_id" style={{ marginTop: -12, marginBottom: 0 }}>
                  <Input type="input" label="Branch" disabled required />
                </Form.Item>
                <Form.Item name="document_date" style={{ marginTop: -12, marginBottom: 0 }}>
                  <Input label="Doc. Date" required disabled />
                </Form.Item>
                <Form.Item name="sloc_id" style={{ marginTop: -12, marginBottom: 0 }}>
                  <Input label="Sloc" required disabled />
                </Form.Item>
                <Form.Item name="posting_date" style={{ marginTop: -12, marginBottom: 0 }}>
                  <Input label="Posting Date" required disabled />
                </Form.Item>

                <Form.Item name="header_text" style={{ marginTop: -12, marginBottom: 0 }}>
                  <Input label="Header Text" type="input" disabled />
                </Form.Item>
              </div>
            </Form>
            <Divider style={{ borderColor: '#AAAAAA' }} />

            <Spacer size={20} />
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
              <Table
                editable
                data={tableAddItems.data}
                columns={tableAddItems.columns}
                loading={tableAddItems.loading}
              />
            </div>
            <Button
              size="small"
              variant="tertiary"
              onClick={tableAddItems.handleAddItem}
              style={{ margin: '32px 0 20px', border: 'transparent' }}
            >
              <ICPlus /> Add New
            </Button>
          </Card>

          <Modal
            open={showCancelModal}
            onOk={handleCancel}
            onCancel={() => setShowCancelModal(false)}
            title="Confirm Cancel Process"
            content={`Are you sure want Cancel and Unfreeze Process Reff. Number : ${data?.id} Branch ${data?.branch_id} - ${data?.branch_name}, Sloc ${data?.sloc_id} - ${data?.sloc_name}`}
            successOkText="Next Proccess"
            successCancelText="Back to List"
            onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/stock-opname`)}
            successContent={(res: any) => (
              <>
                Reff. Number :
                <Typography.Text copyable={{ text: res?.data?.id as string }}>
                  {' '}
                  {res?.data?.id}
                </Typography.Text>
                {` Freeze Branch ${data?.branch_id} - ${data?.branch_name}, Sloc $${data?.sloc_id} - ${data?.sloc_name}`}{' '}
                has been successfully canceled
              </>
            )}
          />

          <Modal
            open={showSubmitModal}
            onOk={handleUpdate}
            onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/stock-opname`)}
            onCancel={() => setShowSubmitModal(false)}
            title="Confirm Submit"
            content={`Are you sure want Submit Reff. Number - ${data?.id}?`}
            successContent={(res: any) => (
              <>
                Stock Opname ID :
                <Typography.Text copyable={{ text: router.query.id as string }}>
                  {' '}
                  {router.query.id}
                </Typography.Text>
                has been successfully submitted
              </>
            )}
            successOkText="OK"
          />
        </Col>
      )}
    </>
  )
}
