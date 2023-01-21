import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow, Modal, Tabs } from 'src/components'
import { Loader } from 'src/components'

import { useRouter } from 'next/router'
import { cancelProcess, getGoodReceiptDetail } from 'src/api/logistic/good-receipt'
import { PATH } from 'src/configs/menus'

import DocumentHeader from './Tabs/DocumentHeader'
import Lpb from './Tabs/LPB'

export default function DetailGR() {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState<any>()
  const router = useRouter()
  const id = String(router.query.id) || ''

  // Modals
  const [cancelProcessModal, setCancelProcessModal] = useState(false)

  const hashTab = router.asPath.split('#')[1]

  const handleCancelProcess = async () => {
    try {
      const res = await cancelProcess(id || '', details?.movement_type_id || '', {
        cancel_items: {
          company_id: details?.company_id || '',
          branch_id: details?.branch_id || '',
          items: details?.items?.map((item: any, index: number) => ({
            sloc_id: item?.sloc_id,
            product_id: item?.product_id,
            unrestricted_use: item?.qty_gr,
            uom_id: item?.uom_id,
          })),
        },
      })
      return res
    } catch (error) {
      console.error(error)
      return false
    }
  }

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

  useEffect(() => {
    console.log('details', details)
  }, [details])

  return (
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
        <Col>
          <div style={{ display: 'flex', gap: 5 }}>
            <GoBackArrow to={`${PATH.LOGISTIC}/goods-receipt`} />
            <Text variant={'h4'}>View GR From Principal {`${router.query.id}`}</Text>
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
                  Print LPB
                </Button>
              )}
            </div>
          </div>
          <Spacer size={20} />
          <Card style={{ padding: 0 }}>
            <Tabs
              initialActiveTab={hashTab}
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

          <Modal
            title="Confirm Cancel Process"
            open={cancelProcessModal}
            onOk={handleCancelProcess}
            onCancel={() => setCancelProcessModal(false)}
            onOkSuccess={(res) => router.push(`${PATH.LOGISTIC}/goods-receipt`)}
            content="Are you sure want to cancel process? Change you made so far will not saved"
            successContent={(res: any) => 'Cancel Process Success'}
            successOkText="OK"
          />
        </Col>
      )}
    </>
  )
}
