import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import { Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { cancelBatchOrder } from 'src/api/quotation'
import { fieldReason } from 'src/configs/fieldFetches'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'

export default function ConfirmCancel() {
  const {
    handler: { showConfirm, runProcess, stopProcess, unShowConfirm },
  } = useSalesQuotationDetailContext()
  const [reason, setReason] = React.useState<string>()
  const [optionsReason, setOptionsReason] = React.useState([])
  const router = useRouter()
  React.useEffect(() => {
    runProcess('Wait for get Reasons')
    fieldReason('B')
      .then((res) => {
        setOptionsReason(res)
        setReason(res[0].value)
        stopProcess()
      })
      .catch(() => stopProcess())
  }, [])
  return (
    <Popup>
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
            unShowConfirm()
          }}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            runProcess('Wait for cancelling Quotation')
            cancelBatchOrder({
              order_list: [{ id: router.query.id }],
              cancel_reason_id: reason,
            })
              .then(() => {
                showConfirm('success-cancel')
                stopProcess()
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
