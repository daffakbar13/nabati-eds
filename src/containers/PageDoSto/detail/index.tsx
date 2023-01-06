import React from 'react'
import moment from 'moment'
import { Button, Spacer, Text, Table, Row as RowPinkLava } from 'pink-lava-ui'
import { Card, Modal } from 'src/components'
import { Row, Col, Divider, Tabs, Typography } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { requestPreviousTable } from 'src/hooks'
import { ArrowLeftOutlined } from '@ant-design/icons'
import TaggedStatus from 'src/components/TaggedStatus'
import { Loader } from 'src/components'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import {
  getPoStoDetail,
  updateStatusPoSto,
  updatePGIinventoryBooking,
  AutoCreateGR,
} from 'src/api/logistic/do-sto'
import AllTabs from './tabs'
import DOSTO from './tabs/DOSTO'
import DeliveryNote from './tabs/DeliveryNote'

export default function PageDoStoDetail() {
  const now = new Date().toISOString()
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const router = useRouter()
  const data: any = useDetail(getPoStoDetail, { id: router.query.id as string }, false)
  const hasData = Object.keys(data).length > 0
  const componentRef = React.useRef()
  const [modalPGI, setModalPGI] = React.useState(false)
  const [cancelProses, setCancelProses] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const handleUpdateStatus = async () => {
    if (cancelProses) {
    } else {
      try {
        await AutoCreateGR(data.id as string, data.purchase_id as string, {
          branch_id: data.receive_branch_id,
          document_type: 'WE',
          document_date: moment(data.document_date).format('YYYY-MM-DD'),
          posting_date: moment(now).format('YYYY-MM-DD'),
          header_text: data.header_text,
          ref_document_type: '',
          reference_number: '',
          from_sloc: 'GS00',
          to_sloc: 'GS00',
          items: data.items?.map((item: any, index) => {
            return {
              product_id: item.product_id,
              description: item.description,
              qty: item.received_qty,
              uom_id: item.received_uom_id,
              sloc_id: item.sloc_id,
              remarks: item.remarks,
              batch: item.batch,
            }
          }),
        })
        await updatePGIinventoryBooking(router.query.id as string, {
          sto_doc_type: 'ZDST',
          supply_branch_id: data.supply_branch_id,
          items: data.items?.map((item: any, index) => {
            return {
              product_id: item.product_id,
              received_qty: item.received_qty,
              received_uom_id: item.received_uom_id,
              sloc_id: item.sloc_id,
            }
          }),
        })
        return await updateStatusPoSto(router.query.id as string, { status_id: '07' })
      } catch (error) {
        console.error(error)
      }
    }
    return false
  }

  React.useEffect(() => {
    if (data.receive_branch_id) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [data])
  return (
    <>
      {loading && <Loader type="process" text="Wait for get data" />}
      {!loading && (
        <Col>
          <div style={{ display: 'flex', gap: 5 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                requestPreviousTable()
                router.push('/logistic/do-sto')
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: 25 }} />
            </div>
            <Text variant={'h4'}>{titlePage}</Text>
          </div>
          <Spacer size={20} />
          <Card style={{ overflow: 'unset' }}>
            {data.status != 'Pending' &&
            data.status != 'Wait For Approval' &&
            data.status != 'PGI Done' ? (
              <Text variant={'h5'}>
                <TaggedStatus status={data.status} size="h5" />
              </Text>
            ) : (
              ''
            )}
            <RowPinkLava justifyContent="space-between" reverse>
              {data.status == 'Pending' || data.status == 'Wait For Approval' ? (
                <>
                  <RowPinkLava gap="16px">
                    <Button
                      size="big"
                      variant="secondary"
                      onClick={() => {
                        router.push(`/logistic/do-sto/edit/${router.query.id}`)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="big"
                      variant="primary"
                      onClick={() => {
                        setModalPGI(true)
                      }}
                    >
                      PGI
                    </Button>
                  </RowPinkLava>
                  <Text variant={'h5'}>
                    <TaggedStatus status="Pending" size="h5" />
                  </Text>
                </>
              ) : (
                ''
              )}
              {data.status == 'PGI Done' ? (
                <>
                  <RowPinkLava gap="16px">
                    <Button
                      size="big"
                      variant="tertiary"
                      onClick={() => {
                        setModalPGI(true)
                        setCancelProses(true)
                      }}
                    >
                      Cancel Process
                    </Button>
                  </RowPinkLava>
                  <Text variant={'h5'}>
                    <TaggedStatus status="PGI Done" size="h5" />
                  </Text>
                </>
              ) : (
                ''
              )}
            </RowPinkLava>
          </Card>
          <Spacer size={20} />
          <Card style={{ padding: '16px 20px' }}>
            <Tabs
              defaultActiveKey="1"
              onChange={(asd) => {
                setCurrentTab(asd)
              }}
              items={AllTabs}
            />
            {hasData && (
              <>
                {currentTab === '1' ? (
                  <DOSTO data={data} />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: 'grey',
                      padding: '15px 0',
                      maxHeight: 1122.5,
                      overflow: 'scroll',
                    }}
                  >
                    <div ref={componentRef}>
                      {currentTab === '2' && <DeliveryNote data={data} />}
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>
          <Modal
            title={cancelProses ? 'Confirm Cancel Process' : 'Confirm Submit'}
            open={modalPGI}
            onOk={handleUpdateStatus}
            onCancel={() => {
              setModalPGI(false)
              setCancelProses(false)
            }}
            content={
              cancelProses
                ? `Are you sure want to Cancel Process This DO STO ?`
                : `Are you sure want to PGI This DO STO ?`
            }
            successTitle="Success"
            onOkSuccess={() => {
              router.push('/logistic/do-sto')
            }}
            successContent={(res: any) => (
              <>
                DO STO
                <Typography.Text copyable={{ text: router.query.id as string }}>
                  {' '}
                  {router.query.id}
                </Typography.Text>
                {cancelProses
                  ? 'cancel process successfully changed'
                  : 'status has been successfully changed'}
              </>
            )}
            successOkText="OK"
            width={432}
          />
        </Col>
      )}
    </>
  )
}
