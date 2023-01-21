import { useRouter } from 'next/router'
import React from 'react'
import { usePathHistory } from 'src/hooks'
import { appHandler } from './handler'
import { appReducer } from './reducer'
import { AppState } from './state'

export const appContext = React.createContext<{
  state: AppState
  handler: ReturnType<typeof appHandler>
}>(undefined)

export default function AppProvider(props: React.PropsWithChildren<React.ReactNode>) {
  const { children } = props
  const { Provider } = appContext
  const inititalState: AppState = {
    isRequestPrevious: false,
    table_log: {
      filters: [],
      limit: 1,
      page: 1,
    },
  }
  const [state, dispatch] = React.useReducer(appReducer, inititalState)
  const handler = appHandler(state, dispatch)
  const pathHistory = usePathHistory()
  function getMenuName(path: string) {
    return path?.split('/')[2]
  }

  function isPathCurrent(key: string) {
    return pathHistory.currentPath?.includes(key)
  }

  function requestPrevRules() {
    const sectionRules = isPathCurrent('detail') || isPathCurrent('create') || isPathCurrent('edit')
    const menuRules = getMenuName(pathHistory.currentPath) === getMenuName(pathHistory.previousPath)
    return sectionRules
  }

  React.useEffect(() => {
    if (requestPrevRules()) {
      handler.handleIsRequestPrev(true)
    }
  }, [pathHistory.currentPath])

  return <Provider value={{ state, handler }}>{children}</Provider>
}

export function useAppContext() {
  return React.useContext(appContext)
}
