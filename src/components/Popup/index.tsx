import React from 'react'

interface PopupProps {
    children?: React.ReactNode
}

export default function Popup(props: PopupProps) {
    const { children } = props

    return (
        <div
            style={{
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                position: 'absolute',
                backgroundColor: '#00000073',
                zIndex: 999,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    // bottom: '50%',
                    // right: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 8,
                    // width: 780,
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
            </div>
        </div>
    )
}
