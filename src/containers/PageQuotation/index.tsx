/* eslint-disable radix */
import React from 'react'
import * as XLSX from 'xlsx'
import { useRouter } from 'next/router'
import { Button, Search, Spacer, Text, Table } from 'pink-lava-ui'
import { Card } from 'src/components'
import { colors } from 'src/configs/colors'
import { Checkbox, Popover, Divider, Typography, Col, Row } from 'antd'
import useTable from 'src/hooks/useTable'
import { MoreOutlined, CheckCircleFilled, DownOutlined } from '@ant-design/icons'
import useTitlePage from 'src/hooks/useTitlePage'
import FloatAction from 'src/components/FloatAction'
import {
  cancelBatchOrder,
  downloadTemplateQuotation,
  getQuotation,
  multipleSubmitQuotation,
} from 'src/api/quotation'
import Popup from 'src/components/Popup'
import SmartFilter, { FILTER, useSmartFilters } from 'src/components/SmartFilter'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldReason } from 'src/configs/fieldFetches'
import { PATH } from 'src/configs/menus'
import { ICDownloadTemplate, ICSyncData, ICUploadTemplate } from 'src/assets'
import Loader from 'src/components/Loader'
import Pagination from 'src/components/Pagination'
import ReactToPrint from 'react-to-print'
import axios from 'axios'
import { PageQuotationProps } from './types'
import { useColumnQuotation } from './columns'

function showTotal(total: number, range: number[]) {
  const ranges = range.join('-')
  const text = ['Showing', ranges, 'of', total, 'items'].join(' ')
  return <p>{text}</p>
}

export default function PageQuotation(props: PageQuotationProps) {
  const { filters, setFilters } = useSmartFilters([
    FILTER.SALES_ORG,
    FILTER.BRANCH,
    FILTER.SOLD_TO_CUSTOMER,
    FILTER.SHIP_TO_CUSTOMER,
    FILTER.ORDER_TYPE,
    FILTER.ORDER_DATE,
  ])
  const table = useTable({
    funcApi: getQuotation,
    haveCheckbox: { headCell: 'status_name', member: ['New'] },
    columns: useColumnQuotation,
  })
  const titlePage = useTitlePage('list')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [submittedQuotation, setSubmittedQuotation] = React.useState([])
  const [processing, setProcessing] = React.useState('')
  const [downloadData, setDownloadData] = React.useState<any>()
  const componentRef = React.useRef()
  const onProcess = processing !== ''
  const hasData = table.total > 0
  const router = useRouter()
  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]

  //   const handleUpload = (e) => {
  //     e.preventDefault();

  //     var files = e.target.files, f = files[0];
  //     var reader = new FileReader();
  //     reader.onload = function (e) {
  //         var data = e.target.result;
  //         let readedData = XLSX.read(data, {type: 'binary'});
  //         const wsname = readedData.SheetNames[0];
  //         const ws = readedData.Sheets[wsname];

  //         /* Convert array to json*/
  //         const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
  //         setFileUploaded(dataParse);
  //     };
  //     reader.readAsBinaryString(f)
  // }

  // const downloadFile = async () => {
  //   const resp = await axios.post(
  //     'https://dist-system.nabatisnack.co.id:3001/v1/quotations/export-excel',
  //     {},
  //     {
  //       responseType: 'arraybuffer',
  //       headers: { 'Content-Type': 'blob' },
  //     },
  //   )

  //   const link = document.createElement('a')
  //   const fileName = 'file.xlsx'
  //   link.setAttribute('download', fileName)
  //   link.href = URL.createObjectURL(new Blob([resp.data]))
  //   document.body.appendChild(link)
  //   console.log('blob', new Blob([resp.data]))

  //   link.click()
  //   link.remove()
  // }

  const selectedQuotation = {
    text: oneSelected ? firstSelected : `${firstSelected}, +${table.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.selected.join(', ')}</div>,
  }

  const moreContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        fontWeight: 'bold',
        // padding: 5,
      }}
    >
      <ReactToPrint
        onBeforeGetContent={async () => {
          await downloadTemplateQuotation().then((e) => {
            // setDownloadData(e)
          })
        }}
        // onBeforePrint={() => {
        //   downloadTemplateQuotation().then((e) => {
        //     setDownloadData(e)
        //   })
        // }}
        // onAfterPrint={() => {
        //   // setDownloadData('')
        // }}
        removeAfterPrint
        trigger={() => (
          <div style={{ display: 'flex', gap: 5, cursor: 'pointer' }}>
            <ICDownloadTemplate /> Download Template
          </div>
        )}
        content={() => componentRef.current}
      />
      <div style={{ display: 'flex', gap: 5, cursor: 'pointer' }}>
        <ICUploadTemplate /> Upload Template
      </div>
      <div style={{ display: 'flex', gap: 5, cursor: 'pointer' }}>
        <ICSyncData /> Sync Data
      </div>
    </div>
  )

  const ConfirmSubmit = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Submit
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        Are you sure to submit quotation
        <Typography.Text>
          {oneSelected && ` ${selectedQuotation.text}`}
          {!oneSelected && (
            <Popover content={selectedQuotation.content}>{` ${selectedQuotation.text}`}</Popover>
          )}
        </Typography.Text>
        {' ?'}
      </Typography.Title>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setShowConfirm('')
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            setProcessing('Wait for submitting Quotation')
            multipleSubmitQuotation({ order_list: table.selected.map((id) => ({ id })) })
              .then((response) => response.data)
              .then((data) => {
                setShowConfirm('success-submit')
                setSubmittedQuotation(data.results.map(({ id }) => id))
                setProcessing('')
              })
              .catch(() => setProcessing(''))
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessSubmit = () => (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Submit Success
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
          New Sales Order
          <Typography.Text
            copyable={{ text: oneSelected ? submittedQuotation[0] : submittedQuotation.join(', ') }}
          >
            {oneSelected ? (
              ` ${submittedQuotation[0]}`
            ) : (
              <Popover content={submittedQuotation.join(', ')}>
                {` ${submittedQuotation[0]}, +${submittedQuotation.length - 1} more`}
              </Popover>
            )}
          </Typography.Text>{' '}
          has been
        </div>
        <div>successfully submitted</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            router.push(`${PATH.SALES}/quotation`)
          }}
        >
          Back To List
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/sales-order`)
          }}
        >
          Next Process
        </Button>
      </div>
    </Popup>
  )

  const ConfirmCancel = () => (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <DebounceSelect
        type="select"
        value={optionsReason.find(({ value }) => reason === value)?.label}
        label={'Reason Cancel Process Quotation'}
        required
        options={optionsReason}
        onChange={({ value }) => setReason(value)}
      />
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          onClick={() => {
            setShowConfirm('')
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            setProcessing('Wait for cancelling Quotation')
            cancelBatchOrder({
              order_list: table.selected.map((id) => ({ id })),
              cancel_reason_id: reason,
            })
              .then(() => {
                setShowConfirm('success-cancel')
                setProcessing('')
              })
              .catch((err) => console.log(err))
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )

  const ConfirmSuccessCancel = () => (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Cancel Success
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
          Quoatation
          <Typography.Text
            copyable={{ text: oneSelected ? selectedQuotation.text : table.selected.join(', ') }}
          >
            {oneSelected ? (
              ` ${selectedQuotation.text}`
            ) : (
              <Popover content={selectedQuotation.content}>{` ${selectedQuotation.text}`}</Popover>
            )}
          </Typography.Text>{' '}
          has been
        </div>
        <div>successfully canceled</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(`${PATH.SALES}/quotation`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )

  React.useEffect(() => {
    fieldReason('B')
      .then((data) => {
        setOptionsReason(data)
        setReason(data[0].value)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <Col>
      {onProcess && <Loader type="process" text={processing} />}
      <Text variant={'h4'}>{titlePage}</Text>
      <div ref={componentRef}>{downloadData}</div>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        <Row justify="space-between">
          <Row gutter={16}>
            <Search
              width="380px"
              nameIcon="SearchOutlined"
              placeholder="Search Quotation ID"
              colorIcon={colors.grey.regular}
              onChange={(e) => {
                const { value } = e.target
                if (value === '') {
                  table.handleFilter([])
                } else {
                  table.handleFilter([
                    {
                      field: 'eds_order.id',
                      option: 'CP',
                      from_value: `%${e.target.value}%`,
                    },
                  ])
                }
              }}
            />
            <SmartFilter
              onOk={(newVal) => {
                const newFiltered = newVal
                  .filter((obj) => obj.fromValue)
                  .map((obj) => ({
                    field: `eds_order.${obj.field}`,
                    option: obj.option,
                    from_value: obj.fromValue.value,
                    to_value: obj.toValue?.value,
                  }))
                setFilters(newVal)
                table.handleFilter(newFiltered)
              }}
              filters={filters}
            />
          </Row>
          <Row gutter={16}>
            <Popover placement="bottom" content={moreContent} trigger="click">
              <Button
                size="big"
                variant="secondary"
                onClick={downloadTemplateQuotation}
                style={{ gap: 5 }}
              >
                More <DownOutlined />
              </Button>
            </Popover>
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
      <Card style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'scroll' }}>
          <Table
            scroll={{ x: 'max-content', y: 600 }}
            loading={table.loading}
            columns={table.columns}
            dataSource={table.data}
            showSorterTooltip={false}
            rowSelection={table.rowSelection}
            rowKey={'id'}
          />
        </div>
        {hasData && (
          <Pagination
            defaultPageSize={20}
            pageSizeOptions={[20, 50, 100]}
            total={table.total}
            totalPage={table.totalPage}
            onChange={(page, limit) => {
              table.handlePagination(page, limit)
            }}
          />
        )}
        {table.selected.length > 0 && (
          <FloatAction>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <b>{table.selected.length} Document Quotation are Selected</b>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'end', gap: 10 }}>
              <Button
                size="big"
                variant="tertiary"
                onClick={() => {
                  setShowConfirm('cancel')
                }}
              >
                Cancel Process
              </Button>
              <Button
                size="big"
                variant="primary"
                onClick={() => {
                  setShowConfirm('submit')
                }}
              >
                Submit
              </Button>
            </div>
          </FloatAction>
        )}
        {showConfirm === 'submit' && <ConfirmSubmit />}
        {showConfirm === 'success-submit' && <ConfirmSuccessSubmit />}
        {showConfirm === 'cancel' && <ConfirmCancel />}
        {showConfirm === 'success-cancel' && <ConfirmSuccessCancel />}
      </Card>
    </Col>
  )
}
