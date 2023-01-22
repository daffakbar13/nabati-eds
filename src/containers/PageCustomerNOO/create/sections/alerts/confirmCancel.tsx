import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { useSalesQuotationCreateContext } from '../../states'

export default function ConfirmCancel() {
  const {
    state: { canSaveAsDraft },
    handler: { unShowConfirm },
  } = useSalesQuotationCreateContext()
  const router = useRouter()
  const isFromDetail = Object.keys(router.query).includes('id')
  const backToDetailRules = !canSaveAsDraft && isFromDetail

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <b>Are you sure want to cancel? Change you made so far will not saved</b>
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
            const additional = backToDetailRules ? `/detail/${router.query.id}` : ''
            router.push(`${PATH.SALES}/customer-noo${additional}`)
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
