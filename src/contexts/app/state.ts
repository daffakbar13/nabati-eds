import { useTable } from 'src/hooks'

export interface AppState {
  isRequestPrevious: boolean
  table_log: ReturnType<typeof useTable>['state']['body']
  readyFor?: string
}
