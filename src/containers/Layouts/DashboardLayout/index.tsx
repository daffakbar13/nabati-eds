import React, { ReactNode, PropsWithChildren } from 'react'
import Router from 'next/router'

export default function DashboardLayout(props: PropsWithChildren<{}>) {
  return <div style={{ height: '100vh' }}>{props}</div>
}
