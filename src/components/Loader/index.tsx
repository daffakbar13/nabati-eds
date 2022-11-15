import React from 'react'
import { Spin } from 'antd';
import style from './Loader.module.css'

interface LoaderProps {
    type?: 'process'
    text?: string
    render?: React.ReactNode
}

export default function Loader(props: LoaderProps) {
    const { render, text, type } = props
    const [speeder, setSpeeder] = React.useState('')
    const pageType = !type
    const processType = type === 'process'

    React.useEffect(() => {
        const interval = setInterval(() => {
            setSpeeder((current) => {
                if (current.length === 3) {
                    return ''
                }
                return `${current}.`
            })
        }, 500)
        return () => clearInterval(interval)
    }, [])
    return (
        <div
            style={{
                ...(pageType && {
                    display: 'grid',
                    placeItems: 'center',
                    minHeight: 'calc(100vh - 70px)',
                }),
                ...(processType && {
                    position: 'fixed',
                    backgroundColor: '#00000073',
                    zIndex: 899,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }),
            }}>
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    gap: 5,
                    fontWeight: 'bold',
                    ...(processType && {
                        position: 'absolute',
                        textShadow: '0 1px 3px black',
                        color: 'white',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 900,
                    }),
                }}
            >
                <Spin />
                {render
                    || <p>
                        {text || 'Loading Page'}
                        {speeder}
                    </p>
                }
            </div>
        </div>
    )
}
