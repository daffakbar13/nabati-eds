import { Button } from 'pink-lava-ui'
import { Spin } from 'antd'
import { useState } from 'react'

export default function DownloadButton({ downloadApi }) {
    const [loading, setLoading] = useState(false)

    const handleDownload = async () => {
        if (loading) return
        try {
            setLoading(true)
            await downloadApi()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    return (
        <Button loading={true} variant="secondary" onClick={handleDownload}>
            {loading && <Spin size="small" style={{ marginRight: 8, marginBottom: -4 }} />}
            <span style={{ color: loading ? '#ad9d9d' : 'unset' }}>Download</span>
        </Button>
    )
}
