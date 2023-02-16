import { Typography } from 'antd'
import React from 'react'
import { Popup } from 'src/components'
import { Button, Text } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { concatString } from 'src/utils/concatString'
import { useSalesSalesmanDivisionContext } from '../../states'

export default function ConfirmSuccessActivation() {
  const {
    state: { editable },
  } = useSalesSalesmanDivisionContext()
  const router = useRouter()
  const salesman = concatString(editable.salesman_id, editable.salesman_name)
  const isActive = editable.is_active === 'Active'

  return (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <CheckCircleFilled /> Success
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
          {'Salesman Division '}
          <Typography.Text>{salesman}</Typography.Text>
          {' has been '}
        </div>
        <div>successfully {isActive ? 'inactived' : 'actived'}</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            router.push(router.pathname)
          }}
        >
          Oke
        </Button>
      </div>
    </Popup>
  )
}
