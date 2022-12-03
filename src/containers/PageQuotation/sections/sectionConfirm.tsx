/* eslint-disable object-curly-newline */
import { Popover, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button, Text } from 'pink-lava-ui'
import { cancelBatchOrder, multipleSubmitQuotation } from 'src/api/quotation'
import { useTable } from 'src/hooks'
import { CheckCircleFilled } from '@ant-design/icons'
import DebounceSelect from 'src/components/DebounceSelect'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { fieldReason } from 'src/configs/fieldFetches'

interface SectionConfirmProps {
  table: ReturnType<typeof useTable>
  handleProcess: (process: string) => void
  showConfirm: string
  handleShowConfirm: (confirm: string) => void
}

export default function SectionConfirm(props: SectionConfirmProps) {
  const { table, handleProcess, showConfirm, handleShowConfirm } = props
  const [submittedQuotation, setSubmittedQuotation] = React.useState([])
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const router = useRouter()

  const oneSelected = table.selected.length === 1
  const firstSelected = table.selected[0]
  const selectedQuotation = {
    text: oneSelected ? firstSelected : `${firstSelected}, +${table.selected.length - 1} more`,
    content: <div style={{ textAlign: 'center' }}>{table.selected.join(', ')}</div>,
  }

  function ConfirmSubmit() {
    return (
      <Popup>
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
              handleShowConfirm(undefined)
            }}
          >
            No
          </Button>
          <Button
            size="big"
            style={{ flexGrow: 1 }}
            variant="primary"
            onClick={() => {
              handleProcess('Wait for submitting Quotation')
              multipleSubmitQuotation({ order_list: table.selected.map((id) => ({ id })) })
                .then((response) => response.data)
                .then((data) => {
                  handleShowConfirm('success-submit')
                  setSubmittedQuotation(data.results.map(({ id }) => id))
                  handleProcess(undefined)
                })
                .catch(() => handleProcess(undefined))
            }}
          >
            Yes
          </Button>
        </div>
      </Popup>
    )
  }

  function ConfirmSuccessSubmit() {
    return (
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
              copyable={{
                text: oneSelected ? submittedQuotation[0] : submittedQuotation.join(', '),
              }}
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
              router.reload()
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
  }

  function ConfirmCancel() {
    return (
      <Popup
        onOutsideClick={() => {
          handleShowConfirm(undefined)
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
              handleShowConfirm(undefined)
            }}
          >
            No
          </Button>
          <Button
            size="big"
            style={{ flexGrow: 1 }}
            variant="primary"
            onClick={() => {
              handleProcess('Wait for cancelling Quotation')
              cancelBatchOrder({
                order_list: table.selected.map((id) => ({ id })),
                cancel_reason_id: reason,
              })
                .then(() => {
                  handleShowConfirm('success-cancel')
                  handleProcess(undefined)
                })
                .catch((err) => console.log(err))
            }}
          >
            Yes
          </Button>
        </div>
      </Popup>
    )
  }

  function ConfirmSuccessCancel() {
    return (
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
                <Popover
                  content={selectedQuotation.content}
                >{` ${selectedQuotation.text}`}</Popover>
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
  }

  React.useEffect(() => {
    fieldReason('B')
      .then((data) => {
        setOptionsReason(data)
        setReason(data[0].value)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {showConfirm === 'submit' && <ConfirmSubmit />}
      {showConfirm === 'success-submit' && <ConfirmSuccessSubmit />}
      {showConfirm === 'cancel' && <ConfirmCancel />}
      {showConfirm === 'success-cancel' && <ConfirmSuccessCancel />}
    </>
  )
}
