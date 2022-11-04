import React from 'react'
import { CommonDetailParams } from 'src/api/types'

export default function useDetail(
  api?: string,
  funcApi?: (params: CommonDetailParams) => Promise<any>,
  params?: CommonDetailParams,
) {
  const [data, setData] = React.useState({})

  React.useEffect(() => {
    async function getApi() {
      funcApi(params)
        .then((results) => setData(results.data))
        .catch((err) => {
          console.log(err);
          setData({})
        })
    }
    getApi()
  }, [])

  return data
}
