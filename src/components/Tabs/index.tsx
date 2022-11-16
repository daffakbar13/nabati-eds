import React, { useState } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';

interface Tab {
    key: string;
    tab: string;
    children: React.ReactNode
}

const itemsExample: Tab[] = [
    {
        key: 'tab1',
        tab: 'Sign in',
        children: 'Childaf fdafasdfds',
    },
    {
        key: 'tab2',
        tab: 'Sign up',
        children: 'Childaf 22222222222',
    },
];

function TabsCard({ items = itemsExample }: { items: Tab[] }) {
    const [activeTab, setActiveTab] = useState<string>(items[0].key);

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

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
                handleTabChange(key);
            }}
        >
            {items.find((i) => i.key === activeTab).children}
        </Card>
    );
}
export default TabsCard;