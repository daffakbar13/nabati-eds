import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow, Modal } from 'src/components'
import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import { getGrReturnDetail } from 'src/api/logistic/good-return'
import { doCancelProcess } from 'src/api/logistic/good-receipt'

import { PATH } from 'src/configs/menus'

import DocumentHeader from './Tabs/DocumentHeader'
import LRB from './Tabs/LRB'

export default function DetailGrReturn() {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState<{ items: [] }>({ items: [] })
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState('1')
  const id = String(router.query.id) || ''

  // Modals
  const [cancelProcessModal, setCancelProcessModal] = useState(false)

  const hashTab = router.asPath.split('#')[1]

  const handleCancelProcess = async () => {
    try {
      const res = await doCancelProcess(id)
      return res
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getGrReturnDetail(id)
        setDetails(res.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        return error
      }
    }
    fetchData()
  }, [id])

  const AllTabs = [
    { label: 'Document Header', key: '1' },
    { label: 'LRB', key: '2' },
  ]

  return (
    <Col>
      <div style={{ display: 'flex', gap: 5 }}>
        <GoBackArrow to={`${PATH.LOGISTIC}/gr-return`} />
        <Text variant={'h4'}>View GR Return From Principal {`${router.query.id}`}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          {hashTab === '1' && (
            <Button
              size="big"
              variant="tertiary"
              onClick={() => setCancelProcessModal(true)}
              loading={loading}
            >
              Cancel Process
            </Button>
          )}
          {hashTab === '2' && (
            <Button size="big" variant="primary" onClick={() => {}} loading={loading}>
              Print LRB
            </Button>
          )}
        </div>
      </div>
      <Spacer size={20} />
      <Card style={{ padding: 0 }}>
        <Tabs
          defaultActiveKey="1"
          onChange={(asd) => {
            setCurrentTab(asd)
          }}
          items={AllTabs}
        />
        {currentTab === '1' ? (
          <DocumentHeader loading={loading} details={details} />
        ) : (
          <LRB details={details} />
        )}
      </Card>

      <Modal
        title="Confirm Cancel Process"
        open={cancelProcessModal}
        onOk={handleCancelProcess}
        onCancel={() => setCancelProcessModal(false)}
        onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/gr-return`)}
        content="Are you sure want to cancel process? Change you made so far will not saved"
        successContent={(res: any) => 'Cancel Process Success'}
        successOkText="OK"
      />
    </Col>
  )
}
