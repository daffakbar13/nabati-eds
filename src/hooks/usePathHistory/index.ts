import { useRouter } from 'next/router'
import React from 'react'

export default function usePathHistory() {
  const [pathHistory, setPathHistory] = React.useState<string[]>([])
  const [currentPath, setCurrentPath] = React.useState<string>('')
  const [previousPath, setPreviousPath] = React.useState<string>('')
  const { asPath } = useRouter()

  React.useEffect(() => {
    setPathHistory((prev) => [...prev, asPath])
  }, [asPath])

  React.useEffect(() => {
    setCurrentPath(pathHistory[pathHistory.length - 1])
    setPreviousPath(pathHistory[pathHistory.length - 2])
  }, [pathHistory])

  return { pathHistory, previousPath, currentPath }
}
