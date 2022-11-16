import React, { useState, useEffect } from 'react'
import { Button, Col, Spacer, Text, Table } from 'pink-lava-ui'
import { Card, Popup, GoBackArrow, Tabs } from 'src/components'

import { Typography, Divider } from 'antd'
import useTitlePage from 'src/hooks/useTitlePage'
import useDetail from 'src/hooks/useDetail'
import { getGoodReceiptDetail } from 'src/api/logistic/good-receipt'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons'
import { PATH } from 'src/configs/menus'
import { fieldReason } from 'src/configs/fieldFetches'
import DebounceSelect from 'src/components/DebounceSelect'
import Loader from 'src/components/Loader'

import DocumentHeader from './Tabs/DocumentHeader'
import Lpb from './Tabs/Lpb'
import { columns } from './columns'

export default function DetailGR() {
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState<{ items: [] }>({ items: [] })
    const router = useRouter()
    const id = String(router.query.id) || ''

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getGoodReceiptDetail(id)
                setDetails(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error)
            }
        }
        fetchData()
    }, [id])

    console.log('details', details.items);

    return (
        <Col>
            <div style={{ display: 'flex', gap: 5 }}>
                <GoBackArrow to={`${PATH.LOGISTIC}/goods-receipt`} />
                <Text variant={'h4'}>View GR From Principal {`${router.query.id}`}</Text>
                <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end', gap: 10 }}>
                    <Button
                        size="big"
                        variant="tertiary"
                        onClick={() => { }}
                        loading={loading}
                    >
                        Cancel Process
                    </Button>
                </div>
            </div>
            <Spacer size={20} />
            <Card style={{ padding: 0 }}>
                <Tabs items={[
                    {
                        key: '1',
                        tab: 'Document Header',
                        children: <DocumentHeader loading={loading} details={details} />,
                    },
                    {
                        key: '2',
                        tab: 'LPB',
                        children: <Lpb details={details} />,
                    },
                ]
                } />
            </Card>
        </Col>
    )
}
