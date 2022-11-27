import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow, Tabs } from 'src/components'

import { useRouter } from 'next/router'
import { getGrReturnDetail } from 'src/api/logistic/good-return'
import { PATH } from 'src/configs/menus'

import DocumentHeader from './Tabs/DocumentHeader'
import Lrb from './Tabs/LRB'

export default function DetailGrReturn() {
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
        const res = await getGrReturnDetail(id)
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
        <GoBackArrow to={`${PATH.LOGISTIC}/gr-return`} />
        <Text variant={'h4'}>View GR Return From Principal {`${router.query.id}`}</Text>
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
          {hashTab === '1' && (
            <Button size="big" variant="tertiary" onClick={() => {}} loading={loading}>
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
          initialActiveTab={hashTab}
          items={[
            {
              key: '1',
              tab: 'Document Header',
              children: <DocumentHeader loading={loading} details={details} />,
            },
            {
              key: '2',
              tab: 'LRB',
              children: <Lrb details={details} />,
            },
          ]}
        />
      </Card>
    </Col>
  )
}

const a = {
  company_id: 'PP01',
  company_name: 'Pinus Merah Abadi, PT',
  id: '1041000000001',
  doc_number: '1041000000001',
  posting_date: '2022-11-27T00:00:00Z',
  document_date: '2022-11-25T00:00:00Z',
  branch_id: 'P104',
  branch_name: 'PMA Bandung Selatan',
  from_sloc: 'TR00',
  from_sloc_name: 'Transit',
  to_sloc: 'GS00',
  to_sloc_name: 'Good Stock',
  movement_type_id: '311',
  movement_type_name: 'TF trfr within plant',
  header_text: '',
  status_id: '01',
  status: 'Done',
  created_at: '2022-11-24T07:31:55Z',
  created_by: 'SYSTEM',
  modified_at: null,
  modified_by: null,
  items: [
    {
      id: '1',
      material_doc_id: '1041000000001',
      product_id: '300011',
      product_name: 'NABATI TIME BREAK RCE 20g GT (20pcs x 6i',
      qty: '2.000',
      uom_id: 'PCS',
      batch: 'sample one',
      remarks: '4545',
    },
    {
      id: '2',
      material_doc_id: '1041000000001',
      product_id: '300009',
      product_name: 'NABATI RICHEESE 320g MT (6k)',
      qty: '2.000',
      uom_id: 'PCS',
      batch: 'sample one',
      remarks: '4545',
    },
  ],
}
