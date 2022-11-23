import React from 'react'
import { TitleDataListProps } from './types'

export default function TitleDataList(props: TitleDataListProps) {
  const { title } = props

  return <div style={{ color: '#1A727A', fontWeight: 'bold', fontSize: 22 }}>{title}</div>
}
