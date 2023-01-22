import React from 'react'
import { Button as ButtonPinkLava, Col, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Button } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import Quotation from './tabs/Quotation'

export default function PageCollectionDetail() {
  const titlePage = useTitlePage('edit')
  const [currentTab] = React.useState('1')

  return (
    <Col>
      <div style={{ display: 'flex' }}>
        <Text variant={'h4'}>Confirm {titlePage}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 2 }}>
          <Button>asd</Button>
          <ButtonPinkLava size="big" variant="primary" onClick={() => {}}>
            Finish
          </ButtonPinkLava>
        </div>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: '16px 20px' }}>{currentTab === '1' && <Quotation />}</Card>
    </Col>
  )
}
