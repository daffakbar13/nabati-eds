import React from 'react'
import { Spin } from 'antd';
import style from './Loader.module.css'

export default function Loader() {
    return (
        <div style={{ display: 'grid', placeItems: 'center', minHeight: 'calc(100vh - 70px)' }}>
            {/* <div className={style.spinner} /> */}
            <div style={{ display: 'grid', placeItems: 'center', gap: 5 }}>
                <Spin />
                <p>Loading Page...</p>
            </div>
        </div>
    )
}
