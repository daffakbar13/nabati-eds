import React from 'react'
import { CommonDetailParams } from 'src/api/types'

export default function useDetail(
  funcApi?: (params: CommonDetailParams) => Promise<any>,
  params?: CommonDetailParams,
) {
  const [data, setData] = React.useState({})
  console.log(data);


  React.useEffect(() => {
    async function getApi() {
      funcApi(params)
        .then((results) => {
          results.data.result ? setData(results.data.result) : setData(results.data)
        })
        .catch((_) => {
          setData({})
        })
    }
    getApi()
  }, [])

  return data
}
