import useTable from '../useTable'
import { useEffect, useState } from 'react'

export default function useFilters(table: ReturnType<typeof useTable>) {
  const [filters, setFilters] = useState([])
  const [oldfilters, setOldFilters] = useState([])

  useEffect(() => {
    if (table.state.isRequestPrevious) {
      setFilters(table.state.body.filters)
      setOldFilters(table.state.body.filters)
    } else {
      table.handler.handleFilter(filters)
    }
  }, [table.state.isRequestPrevious, filters])

  return {
    filters,
    setFilters,
    oldfilters
  }
}
