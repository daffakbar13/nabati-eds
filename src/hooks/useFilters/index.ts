import React from 'react'
import useTable from '../useTable'

export default function useFilters(table: ReturnType<typeof useTable>) {
  const [filters, setFilters] = React.useState([])
  const [oldfilters, setOldFilters] = React.useState([])

  React.useEffect(() => {
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
    oldfilters,
  }
}
