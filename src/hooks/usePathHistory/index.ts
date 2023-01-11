import { useRouter } from 'next/router'
import React from 'react'

export default function usePathHistory() {
  const [history, setHistory] = React.useState<string[]>([])
  const [previous, setPrevious] = React.useState<string>('')
  const { asPath } = useRouter()

  React.useEffect(() => {
    setHistory((prev) => [...prev, asPath])
  }, [asPath])

  React.useEffect(() => {
    setPrevious(history[history.length - 2])
  }, [history])

  return { history, previous }
}
