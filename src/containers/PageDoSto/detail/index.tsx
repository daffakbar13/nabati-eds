import React from 'react'
import { Button, Spacer, Text, Table, Row as RowPinkLava } from 'pink-lava-ui'
import { Card, Modal } from 'src/components'
import { Row, Col, Divider, Tabs, Typography } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { ArrowLeftOutlined } from '@ant-design/icons'
import TaggedStatus from 'src/components/TaggedStatus'
import { useRouter } from 'next/router'
import useDetail from 'src/hooks/useDetail'
import {
  getPoStoDetail,
  updateStatusPoSto,
  updateBookingStock,
  updateBookingStockPGI,
} from 'src/api/logistic/do-sto'
import AllTabs from './tabs'
import DOSTO from './tabs/DOSTO'
import DeliveryNote from './tabs/DeliveryNote'

export default function PageDoStoDetail() {
  const titlePage = useTitlePage('detail')
  const [currentTab, setCurrentTab] = React.useState('1')
  const router = useRouter()
  const data: any = useDetail(getPoStoDetail, { id: router.query.id as string }, false)
  const hasData = Object.keys(data).length > 0
  const componentRef = React.useRef()
  const [modalPGI, setModalPGI] = React.useState(false)

  const handleUpdateStatus = async () => {
    try {
      await updateStatusPoSto(router.query.id as string, { status_id: '07' })
      await updateBookingStock({
        document_id: router.query.id,
        order_type_id: 'ZDST',
        update_document_id: router.query.id,
        doc_category_id: 'C',
        status_id: '07',
      })
      return await updateBookingStockPGI({
        branch_id: data.supply_branch_id,
        items: data.items?.map((item: any, index) => {
          return {
            product_id: item.product_id,
            sloc_id: item.sloc_id,
            base_qty: item.received_qty,
          }
        }),
      })
    } catch (error) {
      console.error(error)
    }
    return false
  }

  return (
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
            router.push('/logistic/do-sto')
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
        <Text variant={'h4'}>{titlePage}</Text>
      </div>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset' }}>
        {data.status != 'Pending' && data.status != 'Wait For Approval' ? (
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
                <Button size="big" variant="tertiary">
                  Cancel Process
                </Button>
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
                <div ref={componentRef}>{currentTab === '2' && <DeliveryNote data={data} />}</div>
              </div>
            )}
          </>
        )}
      </Card>
      <Modal
        title={'Confirm Submit'}
        open={modalPGI}
        onOk={handleUpdateStatus}
        onCancel={() => {
          setModalPGI(false)
        }}
        content={`Are you sure want to PGI This DO STO ?`}
        successTitle="Success"
        onOkSuccess={() => {
          router.push('/logistic/do-sto')
        }}
        successContent={(res: any) => (
          <>
            DO STO
            <Typography.Text copyable> {router.query.id}</Typography.Text>
            status has been successfully changed
          </>
        )}
        successOkText="OK"
        width={432}
      />
    </Col>
  )
}
