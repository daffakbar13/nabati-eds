import React, { ReactNode, PropsWithChildren } from 'react'

export default function LoginLayout(props: PropsWithChildren<{}>) {
  console.log('props', props)
  const { children } = props

  console.log('children', children)
  return (
    <div>
      Login Layout xxx
      {children}
    </div>
  )
}
