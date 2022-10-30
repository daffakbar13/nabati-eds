import CreateColumns from 'src/utils/createColumns'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

function Linked({ link, type }: { link: string; type: 'id' | 'action' }) {
  const [hover, setHover] = React.useState(false)
  const router = useRouter()
  const navigate = () => router.push(`${router.pathname}/detail/${link}`)

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

const res = {
  company_id: 'PP01',
  branch_id: 'P104',
  product_id: '300006',
  sloc_id: 'GS00',
  unrestricted_use: 1000,
  booking: 0,
  reservation: 0,
}

export const StockRealTimeColumns = [
  CreateColumns('Branch ', 'branch_id', true),
  CreateColumns('Sloc', 'slocId', true),
  CreateColumns('Material', 'dfg', true),
  CreateColumns('Large', 'dfg', true),
  CreateColumns('Middle', 'dfg', true),
  CreateColumns('Small', 'dfg', true),
  CreateColumns('Total', 'dfg', true),
]
