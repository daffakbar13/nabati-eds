import React, { useState, useEffect, useRef } from 'react'
import { Card } from 'antd'
import { useRouter } from 'next/router'

interface Tab {
  key: string
  tab: string
  children: React.ReactNode
}

function TabsCard({ items, initialActiveTab }: { items: Tab[]; initialActiveTab?: string }) {
  const initialTabActive = useRef(items[0].key)
  const [activeTab, setActiveTab] = useState<string>(initialActiveTab || items[0].key)
  const router = useRouter()

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  useEffect(() => {
    const hash = router.asPath.split('#')[1]
    if (hash) return

    router.push({
      pathname: '',
      hash: initialTabActive.current,
    })
  }, [router])

  return (
    <Card
      bordered={false}
      style={{
        padding: 0,
        borderRadius: 16,
        backgroundColor: 'transparent',
        // shadow: 'none',
      }}
      tabList={items}
      activeTabKey={activeTab}
      onTabChange={(key) => {
        handleTabChange(key)
        router.push({
          pathname: '',
          hash: key,
        })
      }}
    >
      {items.find((i) => i.key === activeTab).children}
    </Card>
  )
}
export default TabsCard
