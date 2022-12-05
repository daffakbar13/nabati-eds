import { Col, Row, Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { PATH } from 'src/configs/menus'

interface ConfirmCancelProps {
  handleCancel: (cancel: boolean) => void
}

export default function ConfirmCancel(props: ConfirmCancelProps) {
  const { handleCancel } = props
  const router = useRouter()

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Cancellation
      </Typography.Title>
      <b>Are you sure want to cancel? Change you made so far will not saved</b>
      <Row gutter={10}>
        <Col span={12}>
          <Button
            size="big"
            style={{ width: '100%', flexGrow: 1 }}
            variant="secondary"
            onClick={() => {
              handleCancel(false)
            }}
          >
            No
          </Button>
        </Col>
        <Col span={12}>
          <Button
            size="big"
            style={{ width: '100%', flexGrow: 1 }}
            variant="primary"
            onClick={() => {
              if (router.query.status) {
                const { status, id } = router.query
                router.push({
                  pathname: `${PATH.SALES}/delivery-order/detail/${id}`,
                  query: { status },
                })
              } else {
                router.push(`${PATH.SALES}/delivery-order`)
              }
            }}
          >
            Yes
          </Button>
        </Col>
      </Row>
    </Popup>
  )
}
