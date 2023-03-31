import { Tabs } from 'antd'
import React from 'react'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { CustomerData, Location, Notes, Picture } from './tabs'

export default function SectionTab() {
  const {
    state: { data },
  } = useSalesQuotationDetailContext()
  const [currentTab, setCurrentTab] = React.useState('1')
  const hasData = Object.keys(data).length > 0

  const createTabs = (label: string, key: string) => ({
    label,
    key,
    forceRender: true,
    destroyInactiveTabPane: true,
  })

  const AllTabs = [
    createTabs('Customer Data', '1'),
    createTabs('Location', '2'),
    createTabs('Notes', '3'),
    createTabs('Picture', '4'),
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
          {currentTab === '3' && <Notes />}
          {currentTab === '4' && <Picture />}
        </>
      )}
    </>
  )
}
