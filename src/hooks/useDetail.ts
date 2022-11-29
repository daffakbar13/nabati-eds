import { useRouter } from 'next/router';
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
  const backPage = router.asPath.split('/').splice(0, 3).join('/')

  React.useEffect(() => {
    if (strict) {
      if (router.query.status === 'Draft' || !router.query.status) {
        router.push(backPage)
      } else if (!Object.values(params).includes(undefined)) {
        funcApi(params)
          .then((results) => setData(results.data))
          .catch(() => {
            router.push(backPage)
          })
      }
    } else {
      if (!Object.values(params).includes(undefined)) {
        funcApi(params)
          .then((results) => setData(results.data))
          .catch(() => {
            router.push(backPage)
          })
      }
    }

  }, [router.query])

  return data
}
