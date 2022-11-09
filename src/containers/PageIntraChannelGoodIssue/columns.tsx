/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'
import moment from 'moment'
import DateFormat from 'src/components/DateFormat'
import { Tag } from 'antd'

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
    const router = useRouter()
    const navigate = () => {
        status === 'Draft'
            ? router.push(`${PATH.SALES}/quotation/edit/${link}`)
            : router.push(`${PATH.SALES}/quotation/detail/${link}?status=${status}`)
    }
    const [hover, setHover] = React.useState(false)

    return (
        <>
            {type === 'id' ? (
                <div
                    onClick={navigate}
                    onMouseEnter={() => {
                        setHover(true)
                    }}
                    onMouseLeave={() => {
                        setHover(false)
                    }}
                    style={{
                        cursor: 'pointer',
                        ...(hover && { color: '#EB008B', textDecoration: 'underline' }),
                    }}
                >
                    {link}
                </div>
            ) : (
                <Button size="big" variant="tertiary" onClick={navigate}>
                    View Detail
                </Button>
            )}
        </>
    )
}

export const TableIntraChannelRequest = [
    CreateColumns(
        'Request Number',
        'id',
        true,
        (link: string, record: any) => <Linked link={link} type="id" status={record.status_name} />,
    ),
    CreateColumns(
        'GI Number',
        'sold_to_customer_id',
        true,
    ),
    CreateColumns(
        'Posting Date',
        'order_date',
        true,
        (date) => <DateFormat date={date} format='DD-MM-YYYY' />,
    ),
    CreateColumns(
        'Company',
        'sold_to_customer_id',
        true,
    ),
    CreateColumns(
        'Supplying Plant',
        'sales_org_id',
        true,
    ),
    CreateColumns(
        'Receiving Plant',
        'branch_id',
        true,
    ),
    CreateColumns(
        'Mov. Type',
        'branch_id',
        true,
    ),
    CreateColumns(
        'Status',
        'status_name',
        true,
        (status) => <Tag {...(status === 'Complete' && { color: 'green' })} > {status}</Tag>,
    ),
    CreateColumns(
        'Action',
        'id',
        false,
        (link, record) => <Linked link={link} type="action" status={record.status_name} />,
    ),
]
