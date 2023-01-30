import React, { ReactNode, PropsWithChildren } from 'react'

export default function LoginLayout(props: PropsWithChildren<{}>) {
  const { children } = props

  return (
    <div>
      Login Layout xxx
      {children}
    </div>
  )
}
