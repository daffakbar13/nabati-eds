import { Tabs } from 'antd'
import React from 'react'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { CustomerData, Location, Notes, Picture, SalesmanVisit } from './tabs'

export default function SectionTab() {
  const {
    state: { data },
  } = useSalesQuotationDetailContext()
  const [currentTab, setCurrentTab] = React.useState('1')
  const hasData = data && Object.keys(data).length > 0

  const createTabs = (label: string, key: string) => ({
    label,
    key,
    forceRender: true,
    destroyInactiveTabPane: true,
  })

  const AllTabs = [
    createTabs('Customer Data', '1'),
    createTabs('Location', '2'),
    createTabs('Salesman Visit', '3'),
    createTabs('Notes', '4'),
    createTabs('Picture', '5'),
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
          {currentTab === '1' && <CustomerData />}
          {currentTab === '2' && <Location />}
          {currentTab === '3' && <SalesmanVisit />}
          {currentTab === '4' && <Notes />}
          {currentTab === '5' && <Picture />}
        </>
      )}
    </>
  )
}
