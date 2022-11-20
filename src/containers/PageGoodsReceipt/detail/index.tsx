import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow, Tabs } from 'src/components'

import { useRouter } from 'next/router'
import { getGoodReceiptDetail } from 'src/api/logistic/good-receipt'
import { PATH } from 'src/configs/menus'

import DocumentHeader from './Tabs/DocumentHeader'
import Lpb from './Tabs/LPB'

export default function DetailGR() {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState<{ items: [] }>({ items: [] })
  const router = useRouter()
  const id = String(router.query.id) || ''

  const hashTab = router.asPath.split('#')[1]

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getGoodReceiptDetail(id)
        setDetails(res.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }
    fetchData()
  }, [id])

  return (
    <Col>
      <div style={{ display: 'flex', gap: 5 }}>
        <GoBackArrow to={`${PATH.LOGISTIC}/goods-receipt`} />
        <Text variant={'h4'}>View GR From Principal {`${router.query.id}`}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          {hashTab === '1' && (
            <Button size="big" variant="tertiary" onClick={() => {}} loading={loading}>
              Cancel Process
            </Button>
          )}
          {hashTab === '2' && (
            <Button size="big" variant="primary" onClick={() => {}} loading={loading}>
              Print LPB
            </Button>
          )}
        </div>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: 0 }}>
        <Tabs
          items={[
            {
              key: '1',
              tab: 'Document Header',
              children: <DocumentHeader loading={loading} details={details} />,
            },
            {
              key: '2',
              tab: 'LPB',
              children: <Lpb details={details} />,
            },
          ]}
        />
      </Card>
    </Col>
  )
}
