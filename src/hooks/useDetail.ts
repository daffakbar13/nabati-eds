/* eslint-disable no-shadow */
import React from 'react'
import { CommonDetailParams } from 'src/api/types'

export default function useDetail(
  funcApi?: (params: CommonDetailParams) => Promise<any>,
  params?: CommonDetailParams,
) {
  const [data, setData] = React.useState<any>({})
  console.log(data);

  React.useEffect(() => {
    async function getApi() {
      funcApi(params)
        .then((results) => setData(results.data))
        .catch((_) => {
          setData({})
        })
    }
    getApi()
  }, [])

  return data
}
