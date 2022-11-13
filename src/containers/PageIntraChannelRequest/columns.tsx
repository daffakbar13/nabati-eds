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

function Linked({ link, status, type }: { link: string; status: string; type: 'id' | 'action' }) {
    const router = useRouter()
    const navigate = () => {
        status === 'Draft'
            ? router.push(`${PATH.SALES}/quotation/edit/${link}`)
            : router.push(`${PATH.LOGISTIC}/request-intra-channel/detail/${link}`)
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
        'Supplying Branch',
        'supply_branch_name',
        true,
        (text: string, record: any) => `${record.suppl_branch_id || ''} - ${record.supply_branch_name || ''}`,
    ),
    CreateColumns(
        'Receiving Branch',
        'receive_plant_id',
        true,
        (text: string, record: any) => `${record.receive_plant_id || ''} - ${record.receive_plant_name || ''}`,
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
        (link, record) => <Linked link={link} type="action" status={record.status_name} />,
    ),
]

export const TableIntraChannelRequestDetail = [
    CreateColumns(
        'No',
        'id',
        true,
        (text: string, record: any, index: number) => index + 1,
    ),
    CreateColumns(
        'Item Sender',
        'product_sender_id',
        true,
        (text: string, record: any) => `${record.product_sender_id} - ${record.product_sender_name}`,
    ),
    CreateColumns(
        'Item Receiver',
        'product_receiver_id',
        true,
        (text: string, record: any) => `${record.product_receiver_id} - ${record.product_receiver_name}`,
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
