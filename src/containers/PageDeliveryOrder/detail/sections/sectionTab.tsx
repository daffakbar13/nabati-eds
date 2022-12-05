import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { TabDocumentFlow } from 'src/components'
import { CustomerInfo, DeliveryOrder, DocumentFlow, SalesmanInfo } from './tabs'

interface SectionTabProps {
  data: any
}

export default function SectionTab(props: SectionTabProps) {
  const { data } = props
  const [currentTab, setCurrentTab] = React.useState('1')
  const router = useRouter()
  const hasData = Object.keys(data).length > 0

  const createTabs = (label: string, key: string) => ({
    label,
    key,
    children: '',
    forceRender: true,
    destroyInactiveTabPane: true,
  })

  const AllTabs = [
    createTabs('Delivery Order', '1'),
    createTabs('Document Flow', '2'),
    createTabs('Customer Info', '3'),
    createTabs('Salesman Info', '4'),
  ]

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        onChange={(current) => {
          setCurrentTab(current)
        }}
        items={AllTabs}
      />
      {hasData && (
        <>
          {currentTab === '1' && <DeliveryOrder data={data} />}
          {currentTab === '2' && <TabDocumentFlow document_id={router.query.id as string} />}
          {currentTab === '3' && <CustomerInfo data={data} />}
          {currentTab === '4' && <SalesmanInfo data={data} />}
        </>
      )}
    </>
  )
}
