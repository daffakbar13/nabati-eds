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

  React.useEffect(() => {
    async function getApi() {
      funcApi(params)
        .then((results) => setData(results.data))
        .catch((err) => {
          // setData({})
          router.back()
        })
    }
    getApi()
  }, [router])

  return data
}
