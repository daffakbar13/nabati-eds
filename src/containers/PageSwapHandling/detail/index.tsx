import { Tag } from 'antd'
import { Col, Spacer, Table, Text } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow } from 'src/components'

import moment from 'moment'
import List from 'src/components/List'
import { toTitleCase } from 'src/utils/caseConverter'

import { useRouter } from 'next/router'
import { getDetailSwapHandling } from 'src/api/logistic/swap-handling'
import { PATH } from 'src/configs/menus'

import { getTagColor } from 'src/utils/getTagColor'
import { columns } from './columns'

const DATE_FORMAT = 'DD-MMM-YYYY'
export default function DetailStockAdjustment() {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(null)
  const router = useRouter()
  const id = String(router.query.id) || ''

  useEffect(() => {
    if (!id) return
    console.log('id useEffect', id)
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getDetailSwapHandling(id)
        setDetails(res.data || [])
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
        <GoBackArrow to={`${PATH.LOGISTIC}/swap-handling`} />
        <Text variant={'h4'}>View Swap Handling {`${router.query.id}`}</Text>
      </div>
      <Spacer size={20} />
      <Card style={{ overflow: 'unset', marginBottom: 9 }}>
        <Tag
          style={{
            width: 200,
            padding: '8px 20px',
            border: '1px solid #AAAAAA',
            borderRadius: 8,
          }}
          color={getTagColor(details?.status)}
        >
          {details?.status || <p style={{ color: 'black' }}>Status...</p>}
        </Tag>
      </Card>
      <Card>
        <List loading={loading}>
          <List.Item
            label="Mov. Type"
            value={`${details?.movement_type_id}-${toTitleCase(details?.movement_type_name)}`}
          />
          <List.Item
            label="Branch"
            value={`${details?.branch_id}-${toTitleCase(details?.branch_name)}`}
          />
          <List.Item
            label="Supplying SLoc"
            value={`${details?.from_sloc}-${toTitleCase(details?.from_sloc_name)}`}
          />
          <List.Item
            label="Receiving SLoc"
            value={`${details?.to_sloc}-${toTitleCase(details?.to_sloc_name)}`}
          />
          <List.Item label="Doc Date" value={moment(details?.document_date).format(DATE_FORMAT)} />
          <List.Item
            label="Posting Date"
            value={moment(details?.posting_date).format(DATE_FORMAT)}
          />
          <List.Item label="Header Text" value={details?.header_text} />
          <List.Item label="" value={''} />
          <List.Item label="Created On" value={moment(details?.created_at).format(DATE_FORMAT)} />
          <List.Item label="Created By" value={details?.created_by} />
          <List.Item label="Modified On" value={details?.modified_at} />
          <List.Item label="Modified By" value={details?.modified_by} />
        </List>
        <div style={{ borderTop: '1px solid #AAAAAA', margin: '32px auto 0' }} />
        <div style={{ overflow: 'scroll', marginTop: 16 }}>
          <Table columns={columns} dataSource={details?.items || []} />
        </div>
      </Card>
    </Col>
  )
}
