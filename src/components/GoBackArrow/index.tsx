import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

export default function GoBackButton({ to = '' }) {
    const router = useRouter()
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'pointer',
            }}
            onClick={() => {
                if (to) return router.push(to)
                return router.back()
            }}
        >
            <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
    )
}
