import { useRouter } from 'next/router'
/* eslint-disable no-shadow */
import React from 'react'
import { CommonDetailParams } from 'src/api/types'

export default function useDetail(
  funcApi?: (params: CommonDetailParams) => Promise<any>,
  params?: CommonDetailParams,
  strict: boolean = true,
) {
  const [data, setData] = React.useState<any>({})
  const router = useRouter()
  // const pageList = router.asPath.split('/').splice(0, 3).join('/')
  // const throwToPageList = () => {
  //   router.push(pageList)
  // }

  React.useEffect(() => {
    if (!Object.values(params).includes(undefined)) {
      funcApi(params)
        .then((results) => setData(results.data))
        .catch(() => {
          router.push('/not-found-404')
        })
    }
  }, [router.query])

  return data
}
