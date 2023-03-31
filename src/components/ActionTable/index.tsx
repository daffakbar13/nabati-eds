import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'pink-lava-ui'
import Link from '../Link'

interface ActionTableProps {
  link: string
  type: 'id' | 'action'
  label?: string
}

export default function ActionTable(props: ActionTableProps) {
  const { link, type, label } = props
  const router = useRouter()
  const navigate = () => router.push(link)

  const idType = <Link onClick={navigate}>{label || 'View Detail'}</Link>

  const buttonType = (
    <Button size="big" variant="tertiary" onClick={navigate}>
      {label || 'View Detail'}
    </Button>
  )

  return (
    <>
      {type === 'id' && idType}
      {type === 'action' && buttonType}
    </>
  )
}
