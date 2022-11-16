import React, { useState, useEffect } from 'react'
import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { Card, Popup, GoBackArrow, Tabs, DataList } from 'src/components'

import { Typography } from 'antd'
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

export default function DetailGR() {
    const [details, setDetails] = useState()
    const router = useRouter()
    const id = String(router.query.id) || ''

    console.log('router', router);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getGoodReceiptDetail(id)
                setDetails(res.data)
                console.log('res', res);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [id])

    console.log('details', details);

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
                    >
                        Cancel Process
                    </Button>
                </div>
            </div>
            <Spacer size={20} />
            <Card style={{ padding: '16px 20px' }}>
                <Tabs items={[
                    {
                        key: '1',
                        tab: 'Document Header',
                        children: <DocumentHeader details={details} />,
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
