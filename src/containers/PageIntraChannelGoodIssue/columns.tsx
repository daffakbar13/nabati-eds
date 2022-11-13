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

function Linked({ link, linkType, type }: { link: string; linkType: string; type: 'id' | 'action' }) {
    const router = useRouter()
    const navigate = () => {
        if (linkType == 'id') {
            router.push(`${PATH.LOGISTIC}/goods-issue-intra-channel/detail/${link}`)
        } else if (linkType == 'deliveryNumber') {
            router.push(`${PATH.LOGISTIC}/request-intra-channel/detail/${link}`)
        }
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

export const TableIntraChannelGoodIssue = [
    CreateColumns(
        'Request Number',
        'delivery_number',
        true,
        (link: string, record: any) => <Linked link={link} type="id" linkType='deliveryNumber' />,
    ),
    CreateColumns(
        'GI Number',
        'id',
        true,
        (link: string, record: any) => <Linked link={link} type="id" linkType='id' />,
    ),
    CreateColumns(
        'Posting Date',
        'posting_date',
        true,
        (date) => <DateFormat date={date} format='DD-MM-YYYY' />,
    ),
    CreateColumns(
        'Company',
        'company_id',
        true,
        (text: string, record: any) => `${record.company_id || ''} - ${record.company_name || ''}`,
    ),
    CreateColumns(
        'Supplying Plant',
        'suppl_branch_id',
        true,
        (text: string, record: any) => `${record.suppl_branch_id || ''} - ${record.suppl_branch_name || ''}`,
    ),
    CreateColumns(
        'Receiving Plant',
        'branch_id',
        true,
        (text: string, record: any) => `${record.receive_plant_id || ''} - ${record.receive_plant_name || ''}`,
    ),
    CreateColumns(
        'Mov. Type',
        'branch_id',
        true,
        (text: string, record: any) => `${record.movement_type_id || ''} - ${record.movement_type_name || ''}`,
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
        (link, record) => <Linked link={link} type="action" linkType='id' />,
    ),
]

export const TableIntraChannelGoodIssueDetail = [
    CreateColumns(
        'No',
        'id',
        true,
        (text: string, record: any, index: number) => index + 1,
    ),
    CreateColumns(
        'Item Sender',
        'product_id',
        true,
        (text: string, record: any) => `${record.product_id || ''} - ${record.product_name || ''}`,
    ),
    CreateColumns(
        'Item Receiver',
        'product_receiver_id',
        true,
        (text: string, record: any) => `${record.product_receiver_id || ''} - ${record.product_receiver_name || ''}`,
    ),
    CreateColumns(
        'Qty',
        'qty',
        true,
    ),
    CreateColumns(
        'UoM',
        'uom_id',
        true,
    ),
    CreateColumns(
        'Batch',
        'batch',
        true,
    ),
    CreateColumns(
        'Remarks',
        'remarks',
        true,
    ),
]
