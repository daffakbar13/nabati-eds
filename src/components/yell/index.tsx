import React from 'react'
import { message } from 'antd'

const yell = (msg: string) => message.error({
    content: <span style={{}}>{msg}</span>,
    // duration: 0,
    // top: 100,
})

export default yell
