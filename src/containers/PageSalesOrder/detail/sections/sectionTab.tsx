import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { TabDocumentFlow } from 'src/components'
import { useSalesSalesOrderDetailContext } from 'src/hooks/contexts'
import { CustomerInfo, PricingCondition, PromotionList, SalesmanInfo, SalesOrder } from './tabs'

export default function SectionTab() {
  const {
    state: { data },
  } = useSalesSalesOrderDetailContext()
  const [currentTab, setCurrentTab] = React.useState('1')
  const router = useRouter()
  const hasData = Object.keys(data || {}).length > 0

  const createTabs = (label: string, key: string) => ({
    label,
    key,
    children: '',
    forceRender: true,
    destroyInactiveTabPane: true,
  })

  const AllTabs = [
    createTabs('Sales Order', '1'),
    createTabs('Pricing Condition', '2'),
    createTabs('Promotion List', '3'),
    createTabs('Document Flow', '4'),
    createTabs('Customer Info', '5'),
    createTabs('Salesman Info', '6'),
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
          {currentTab === '1' && <SalesOrder />}
          {currentTab === '2' && <PricingCondition />}
          {currentTab === '3' && <PromotionList />}
          {currentTab === '4' && <TabDocumentFlow document_id={router.query.id as string} />}
          {currentTab === '5' && <CustomerInfo />}
          {currentTab === '6' && <SalesmanInfo />}
        </>
      )}
    </>
  )
}
