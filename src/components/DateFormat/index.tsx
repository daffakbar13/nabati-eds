import moment from 'moment'
import React from 'react'

interface DateFormatProps {
    date: string
    format: string
}

export default function DateFormat(props: DateFormatProps) {
    const { date, format } = props

    return <>{(moment(date)).format(format)}</>
}
