import Router from 'next/router'

const Page = () => {
  Router.push(Router.asPath.replace('logistic', 'sales'))
  return <></>
}

export default Page
