import { Tabs } from 'antd'
import React from 'react'
import {
  CustomerInfo,
  DocumentFlow,
  PricingCondition,
  PromotionList,
  SalesmanInfo,
  SalesOrder,
} from './tabs'

interface SectionTabProps {
  data: any
}

export default function SectionTab(props: SectionTabProps) {
  const { data } = props
  const [currentTab, setCurrentTab] = React.useState('1')
  const hasData = Object.keys(data).length > 0

  const createTabs = (label: string, key: string) => ({
    label,
    key,
    children: '',
    forceRender: true,
    destroyInactiveTabPane: true,
  })

  const AllTabs = [
    createTabs('Quotation', '1'),
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
          {currentTab === '1' && <SalesOrder data={data} />}
          {currentTab === '2' && <PricingCondition data={data} />}
          {currentTab === '3' && <PromotionList data={data} />}
          {currentTab === '4' && <DocumentFlow data={data} />}
          {currentTab === '5' && <CustomerInfo data={data} />}
          {currentTab === '6' && <SalesmanInfo data={data} />}
        </>
      )}
    </>
  )
}
