import { useRouter } from 'next/router';
/* eslint-disable no-shadow */
import React from 'react'
import { CommonDetailParams } from 'src/api/types'

export default function useDetail(
  funcApi?: (params: CommonDetailParams) => Promise<any>,
  params?: CommonDetailParams,
) {
  const [data, setData] = React.useState<any>({})
  const router = useRouter()
  const backPage = router.asPath.split('/').splice(0, 3).join('/')

  React.useEffect(() => {
    async function getApi() {
      funcApi(params)
        .then((results) => setData(results.data))
        .catch((err) => {
          // setData({})
          router.push(backPage)
        })
    }
    getApi()
  }, [router])

  return data
}
