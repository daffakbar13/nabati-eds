import React from 'react'
import { Button as ButtonPinkLava, Col, Spacer, Text } from 'pink-lava-ui'
import { Card } from 'src/components'
import { Button, Tabs } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import { PageSalesOrderDetailProps } from './types'
import AllTabs from './tabs'
import SalesOrder from './tabs/SalesOrder'
import PricingCondition from './tabs/PricingCondition'
import PromotionList from './tabs/PromotionList'
import DocumentFlow from './tabs/DocumentFlow'
import CustomerInfo from './tabs/CustomerInfo'
import SalesmanInfo from './tabs/SalesmanInfo'
import useDetail from 'src/hooks/useDetail'
import { getDetailSalesOrder } from 'src/api/sales-order'
import { useRouter } from 'next/router'

export default function PageSalesOrderDetail(props: PageSalesOrderDetailProps) {
    const titlePage = useTitlePage('detail')
    const [currentTab, setCurrentTab] = React.useState('1')
    const router = useRouter()
    const data = useDetail('', getDetailSalesOrder, { id: router.query.id as string })

    return (
        <Col>
            <div style={{ display: 'flex' }}>
                <Text variant={'h4'}>{titlePage}</Text>
                <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 2 }}>
                    <Button>asd</Button>
                    <ButtonPinkLava size="big" variant="secondary" onClick={() => { }}>
                        Edit
                    </ButtonPinkLava>
                    <ButtonPinkLava size="big" variant="primary" onClick={() => { }}>
                        Order Again
                    </ButtonPinkLava>
                </div>
            </div>
            <Spacer size={20} />
            <Card style={{ padding: '16px 20px' }}>
                <Tabs
                    defaultActiveKey="1"
                    onChange={(asd) => {
                        setCurrentTab(asd)
                    }}
                    items={AllTabs}
                />
                {currentTab === '1' && <SalesOrder data={data} />}
                {currentTab === '2' && <PricingCondition data={data} />}
                {currentTab === '3' && <PromotionList data={data} />}
                {currentTab === '4' && <DocumentFlow data={data} />}
                {currentTab === '5' && <CustomerInfo data={data} />}
                {currentTab === '6' && <SalesmanInfo data={data} />}
            </Card>
        </Col>
    )
}
