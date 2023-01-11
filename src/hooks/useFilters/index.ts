import Router from 'next/router'
import React from 'react'
import useTable from '../useTable'

export default function useFilters(table: ReturnType<typeof useTable>) {
  const [filters, setFilters] = React.useState([])
  const [oldfilters, setOldFilters] = React.useState([])
  const [filterId, setFilterId] = React.useState('')

  React.useEffect(() => {
    if (table.state.isRequestPrevious) {
      setFilters(table.state.body.filters)
      setOldFilters(table.state.body.filters)
      setFilterId(
        table.state.body.filters.find((f) => f.field === 'id')?.from_value.replaceAll('%', '') ||
          '',
      )
    } else {
      table.handler.handleFilter(filters)
    }
  }, [table.state.isRequestPrevious, filters])

  return {
    filters,
    setFilters,
    oldfilters,
    filterId,
    setFilterId,
  }
}
