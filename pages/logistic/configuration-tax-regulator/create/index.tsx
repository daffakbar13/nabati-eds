import Router from 'next/router'
import React from 'react'

const Page = () => {
  React.useEffect(() => {
    Router.push(Router.asPath.replace('logistic', 'sales'))
  })
  return <></>
}

export default Page
