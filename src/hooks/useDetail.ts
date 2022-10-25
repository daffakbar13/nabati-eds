import React from 'react'

export default function useDetail(api: string) {
    const [data, setData] = React.useState({})

    React.useEffect(() => {
        async function getApi() {
            fetch(api)
                .then((response) => response.json())
                .then((results) => setData(results.data.result))
                .catch((_) => setData({}))
        }
        getApi()
    }, [])

    return data
}
