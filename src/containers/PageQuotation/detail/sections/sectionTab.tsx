import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { TabDocumentFlow } from 'src/components'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { CustomerInfo, Quotation, SalesmanInfo } from './tabs'

export default function SectionTab() {
  const pageCtx = useSalesQuotationDetailContext()
  const router = useRouter()
  const [currentTab, setCurrentTab] = React.useState('1')

  return (
    <pageCtx.getConsumer>
      {({ state }) => {
        const hasData = Object.keys(state.data).length > 0

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
                {currentTab === '1' && <Quotation />}
                {currentTab === '2' && <TabDocumentFlow document_id={router.query.id as string} />}
                {currentTab === '3' && <CustomerInfo />}
                {currentTab === '4' && <SalesmanInfo />}
              </>
            )}
          </>
        )
      }}
    </pageCtx.getConsumer>
  )
}
