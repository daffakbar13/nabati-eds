import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'
import { useSalesSalesOrderCreateContext } from 'src/hooks/contexts'

export default function ConfirmCancel() {
  const {
    handler: { unShowConfirm },
  } = useSalesSalesOrderCreateContext()
  const router = useRouter()

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
            if (router.query.status) {
              const { status, id } = router.query
              router.push({
                pathname: `${PATH.SALES}/sales-order/detail/${id}`,
                query: { status },
              })
            } else {
              router.push(`${PATH.SALES}/sales-order`)
            }
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
