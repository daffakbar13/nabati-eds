import React, { ChangeEvent, FC } from 'react'
import { Button, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, DataList, Loader, Popup } from 'src/components'
import { Divider, Row, Typography, Col } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import { getUndeliveredDetail, multipleSubmitUndelivered } from 'src/api/undelivered'
import DebounceSelect from 'src/components/DebounceSelect'
import axios from 'axios'

interface Props {
  selectedItems: any[]
  onCancel: (e?: ChangeEvent<HTMLButtonElement>) => any
  onSubmit?: (e?: ChangeEvent<HTMLButtonElement>) => any
}

const ConfirmReject: FC<Props> = ({ onCancel, onSubmit }) => {
  const titlePage = useTitlePage('detail')
  const [showConfirm, setShowConfirm] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [optionsReason, setOptionsReason] = React.useState([])
  const [proccessing, setProccessing] = React.useState('')
  const router = useRouter()
  const data = useDetail(getUndeliveredDetail, { id: router.query.id as string }, false)
  const hasData = Object.keys(data).length > 0

  if (proccessing) {
    return <Loader text={proccessing} />
  }
  return (
    <Popup
      onOutsideClick={() => {
        setShowConfirm('')
      }}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Rejectation
      </Typography.Title>
      <DebounceSelect
        type="select"
        value={optionsReason.find((e) => reason === e.value)?.label}
        label={'Reason Reject Sales Order'}
        required
        options={optionsReason}
        onChange={(e) => setReason(e.value)}
      />
      <div style={{ display: 'flex', gap: 10 }}>
        <Button size="big" style={{ flexGrow: 1 }} variant="secondary" onClick={onCancel}>
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            setProccessing('Wait for rejecting')
            setTimeout(() => {
              setProccessing('')
              onCancel()
            }, 3000)
            // multipleSubmitUndelivered({
            // shipment_id: [{ id: router.query.id }],
            //   status_approved_id: '02',
            //   reject_reason_id: reason,
            // })
            //   .then(() => {
            //     setShowConfirm('success-reject')
            //     setProccessing('')
            //   })
            //   .catch(() => setProccessing(''))
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}

export default ConfirmReject
