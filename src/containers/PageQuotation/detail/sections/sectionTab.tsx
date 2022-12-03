import { Tabs } from 'antd'
import React from 'react'
import { CustomerInfo, DocumentFlow, Quotation, SalesmanInfo } from './tabs'

interface SectionTabProps {
  data: any
}

export default function SectionTab(props: SectionTabProps) {
  const { data } = props
  const [currentTab, setCurrentTab] = React.useState('1')
  const hasData = Object.keys(data).length > 0

  const createTabs = (label: string, key: string, children: React.ReactNode) => ({
    label,
    key,
    children,
    forceRender: true,
    destroyInactiveTabPane: true,
  })

  const AllTabs = [
    createTabs('Quotation', '1', ''),
    createTabs('Document Flow', '2', ''),
    createTabs('Customer Info', '3', ''),
    createTabs('Salesman Info', '4', ''),
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
          {currentTab === '1' && <Quotation data={data} />}
          {currentTab === '2' && <DocumentFlow data={data} />}
          {currentTab === '3' && <CustomerInfo data={data} />}
          {currentTab === '4' && <SalesmanInfo data={data} />}
        </>
      )}
    </>
  )
}
