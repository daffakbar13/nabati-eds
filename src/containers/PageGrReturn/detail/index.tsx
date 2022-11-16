import { Button, Col, Spacer, Text } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { Card, GoBackArrow, Tabs } from 'src/components'

import { useRouter } from 'next/router'
import { getGrReturnDetail } from 'src/api/logistic/good-return'
import { PATH } from 'src/configs/menus'

import DocumentHeader from './Tabs/DocumentHeader'
import Lrb from './Tabs/Lrb'

export default function DetailGrReturn() {
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState<{ items: [] }>({ items: [] })
    const router = useRouter()
    const id = String(router.query.id) || ''

    useEffect(() => {
        if (!id) return
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getGrReturnDetail(id)
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
                <GoBackArrow to={`${PATH.LOGISTIC}/gr-return`} />
                <Text variant={'h4'}>View GR Return From Principal {`${router.query.id}`}</Text>
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
                        tab: 'LRB',
                        children: <Lrb details={details} />,
                    },
                ]
                } />
            </Card>
        </Col>
    )
}
