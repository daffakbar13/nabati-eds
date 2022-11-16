import React, { useState } from 'react'
import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { Card, Popup, GoBackArrow, Tabs } from 'src/components'

import { Typography } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import useDetail from 'src/hooks/useDetail'
import { cancelSalesOrder, getDetailSalesOrder } from 'src/api/sales-order'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { PATH } from 'src/configs/menus'
import { fieldReason } from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import Loader from 'src/components/Loader'

const tabs = [
    {
        key: '1',
        tab: 'Document Header',
        children: 'Childaf fdafasdfds',
    },
    {
        key: '2',
        tab: 'LPB',
        children: 'LPB Doc',
    },
]

export default function DetailGR() {
    const router = useRouter()

    return (
        <Col>
            <div style={{ display: 'flex', gap: 5 }}>
                <GoBackArrow />
                <Text variant={'h4'}>View GR From Principal {`${router.query.id}`}</Text>
                <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
                    <Button
                        size="big"
                        variant="tertiary"
                        onClick={() => { }}
                    >
                        Cancel Process
                    </Button>
                </div>
            </div>
            <Spacer size={20} />
            <Card style={{ padding: '16px 20px' }}>
                <Tabs items={tabs} />
            </Card>
        </Col>
    )
}
