import moment from 'moment'
import React from 'react'

interface DateFormatProps {
  date: string
  format: string
}

export default function DateFormat(props: DateFormatProps) {
  const { date, format } = props
  const isValid = moment(date).isValid() === true
  const dateFormated = moment(date).format(format)

  return <>{moment(date).format(format)}</>
}
