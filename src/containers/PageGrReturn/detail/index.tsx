import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { Tabs } from 'antd'
import { useEffect, useState, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Card, GoBackArrow, Modal, Loader } from 'src/components'
import { useRouter } from 'next/router'
import { getGrReturnDetail } from 'src/api/logistic/good-return'
import { cancelProcess } from 'src/api/logistic/good-receipt'
import { PATH } from 'src/configs/menus'
import DocumentHeader from './Tabs/DocumentHeader'
import LRB from './Tabs/LRB'
import TaggedStatus from 'src/components/TaggedStatus'

export default function DetailGR() {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState<any>()
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState('1')
  const id = String(router.query.id) || ''
  const componentRef = useRef()

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
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
        <Col>
          <div style={{ display: 'flex', gap: 5 }}>
            <GoBackArrow to={`${PATH.LOGISTIC}/gr-return`} />
            <Text variant={'h4'}>View GR Return From Principal {`${router.query.id}`}</Text>
            <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
              {currentTab === '1' && (
                <>
                  {details?.status_name === 'Done' && (
                    <Button
                      size="big"
                      variant="tertiary"
                      onClick={() => setCancelProcessModal(true)}
                      loading={loading}
                    >
                      Cancel Process
                    </Button>
                  )}
                </>
              )}
              {currentTab === '2' && (
                <ReactToPrint
                  trigger={() => (
                    <Button size="big" variant="primary">
                      Print LPB
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              )}
            </div>
          </div>
          {currentTab === '1' && (
            <>
              <Spacer size={20} />
              <Card style={{ overflow: 'unset', marginBottom: 9 }}>
                <TaggedStatus status={details?.status_name} size="h5" />
              </Card>
            </>
          )}
          <Spacer size={20} />
          <Card style={{ overflow: 'unset', marginBottom: 9 }}>
            <Tabs
              defaultActiveKey="1"
              onChange={(asd) => {
                setCurrentTab(asd)
              }}
              items={AllTabs}
            />
            {currentTab === '1' ? (
              <>
                <DocumentHeader loading={loading} details={details} />
              </>
            ) : (
              <LRB details={details} refs={componentRef} />
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
      )}
    </>
  )
}
