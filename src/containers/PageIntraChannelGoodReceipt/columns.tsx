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
import TaggedStatus from 'src/components/TaggedStatus'

function Linked({ link, linkType, type }: { link: string; linkType: string; type: 'id' | 'action' }) {
    const router = useRouter()
    const navigate = () => {
        if (linkType == 'id') {
            router.push(`${PATH.LOGISTIC}/goods-receipt-intra-channel/detail/${link}`)
        } else if (linkType == 'deliveryNumber') {
            router.push(`${PATH.LOGISTIC}/request-intra-channel/detail/${link}`)
        } else if (linkType == 'goodIssue') {
            router.push(`${PATH.LOGISTIC}/goods-issue-intra-channel/detail/${link}`)
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

export const TableIntraChannelGoodReceipt = [
    CreateColumns(
        'Request Number',
        'delivery_number',
        true,
        (link: string, record: any) => <Linked link={link} type="id" linkType='deliveryNumber' />,
    ),
    CreateColumns(
        'GI Number',
        'gi_number',
        true,
        (link: string, record: any) => <Linked link={link} type="id" linkType='goodIssue' />,
    ),
    CreateColumns(
        'GR Number',
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
        (text: string, record: any) => `${record.company_id} - ${record.company_name}`,
    ),
    CreateColumns(
        'Supplying Plant',
        'suppl_branch_id',
        true,
        (text: string, record: any) => `${record.suppl_branch_id} - ${record.suppl_branch_name}`,
    ),
    CreateColumns(
        'Receiving Plant',
        'receive_plant_id',
        true,
        (text: string, record: any) => `${record.receive_plant_id} - ${record.receive_plant_name}`,
    ),
    CreateColumns(
        'Mov. Type',
        'movement_type_id',
        true,
        (text: string, record: any) => `${record.movement_type_id} - ${record.movement_type_name}`,
    ),
    CreateColumns(
        'Status',
        'status',
        true,
        (status) => <TaggedStatus status={status} />,
    ),
    CreateColumns(
        'Action',
        'id',
        false,
        (link, record) => <Linked link={link} type="action" linkType='id' />,
    ),
]


export const TableIntraChannelGoodReceiptDetail = [
    CreateColumns(
        'No',
        'id',
        true,
        (text: string, record: any, index: number) => index + 1,
    ),
    CreateColumns(
        'Item Sender',
        'material_doc_id',
        true,
        (text: string, record: any) => `${record.material_doc_id || ''} - ${record.material_doc_id || ''}`,
    ),
    CreateColumns(
        'Item Receiver',
        'product_id',
        true,
        (text: string, record: any) => `${record.product_id || ''} - ${record.product_id || ''}`,
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
