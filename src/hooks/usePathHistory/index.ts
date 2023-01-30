import { useRouter } from 'next/router'
import React from 'react'

export default function usePathHistory() {
  const [pathHistory, setPathHistory] = React.useState<string[]>([])
  const { asPath } = useRouter()

  React.useEffect(() => {
    setPathHistory((prev) => [...prev, asPath])
  }, [asPath])

  return {
    pathHistory,
    previousPath: pathHistory[pathHistory.length - 2],
    currentPath: pathHistory[pathHistory.length - 1],
  }
}
