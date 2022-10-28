import React from 'react'
import { TitleDataListProps } from './types'

export default function TitleDataList(props: TitleDataListProps) {
  const { title } = props

  return <h2 style={{ color: '#1A727A' }}>{title}</h2>
}
