import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import { PATH } from 'src/configs/menus'

function Linked({ link, type }: { link: string; type: 'id' | 'action' }) {
    const router = useRouter()
    const navigate = () => {
        router.push(`${PATH.SALES}/sales-order/detail/${link}`)
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

export const TableSalesOrder = [
    CreateColumns('Sales Order ', 'id', true, (link: string) => <Linked link={link} type="id" />),
    CreateColumns('Order Type', 'order_type_id', true),
    CreateColumns('Order Date', 'order_date', true),
    CreateColumns('Sales Org.', 'sales_org_id', true),
    CreateColumns('Branch', 'branch_id', true),
    CreateColumns('Sold To Customer', 'sold_to_customer_name', true),
    CreateColumns('Ship To Customer', 'ship_to_customer_name', true),
    CreateColumns('Salesman', 'salesman_id', true),
    CreateColumns('Total Amount', 'total_amount', true),
    CreateColumns('Create From', 'created_from', true),
    CreateColumns('Availibility', 'asdasd', true),
    CreateColumns('Status', 'status_name', true),
    CreateColumns('Status Process', 'dfg', true),
    CreateColumns('Action', 'id', false, (link: string) => <Linked link={link} type="action" />),
]
