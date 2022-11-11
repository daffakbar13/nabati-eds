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
            ? router.push(`${PATH.LOGISTIC}/quotation/edit/${link}`)
            : router.push(`${PATH.LOGISTIC}/goods-issue-intra-channel/detail/${link}`)
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
        // (link: string, record: any) => <Linked link={link} type="id" status={record.delivery_number} />,
    ),
    CreateColumns(
        'GI Number',
        'id',
        true,
        (link: string, record: any) => <Linked link={link} type="id" status={record.id} />,
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
    ),
    CreateColumns(
        'Supplying Plant',
        'suppl_branch_id',
        true,
        (text: string, record: any) => `${record.suppl_branch_id} - ${record.suppl_branch_name}`,
    ),
    CreateColumns(
        'Receiving Plant',
        'branch_id',
        true,
        (text: string, record: any) => `${record.receive_plant_id} - ${record.receive_plant_name}`,
    ),
    CreateColumns(
        'Mov. Type',
        'branch_id',
        true,
        (text: string, record: any) => `${record.movement_type_id} - ${record.movement_type_name}`,
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

export const TableIntraChannelGoodIssueDetail = [
    CreateColumns(
        'No',
        'id',
        true,
        (text: string, record: any, index: number) => index + 1,
    ),
    CreateColumns(
        'Item Sender',
        'company_id',
        true,
    ),
    CreateColumns(
        'Item Receiver',
        'material_doc_id',
        true,
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
