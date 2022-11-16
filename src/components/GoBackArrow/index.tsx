import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

export default function GoBackButton() {
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
                router.back()
            }}
        >
            <ArrowLeftOutlined style={{ fontSize: 25 }} />
        </div>
    )
}
