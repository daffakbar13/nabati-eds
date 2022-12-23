import React from 'react'
import { Popup } from 'src/components'
import { Text, Button } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import { PATH } from 'src/configs/menus'
import { useRouter } from 'next/router'
import { useSalesQuotationCreateContext } from '../../states'

export default function ConfirmSuccessSubmit() {
  const {
    state: { quotationId, confirm },
  } = useSalesQuotationCreateContext()
  const router = useRouter()
  const isEditPage = router.asPath.includes('edit')
  const isFromDetail = Object.keys(router.query).includes('id')

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
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>
          {!isEditPage ? 'New' : ''} {' Quotation '}
          <Typography.Text copyable>{quotationId}</Typography.Text>
          {' has been'}
        </div>
        <div>successfully {confirm === 'newQuo' ? 'created' : 'saved'}</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            const additional = isFromDetail ? `/detail/${router.query.id}` : ''
            router.push(`${PATH.SALES}/quotation${additional}`)
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )
}
