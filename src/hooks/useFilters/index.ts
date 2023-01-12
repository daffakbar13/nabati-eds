import React from 'react'
import useTable from '../useTable'

export default function useFilters(
  /**
   * Return of Hooks Table
   */
  table: ReturnType<typeof useTable>,
  /**
   * Column Name of ID
   */
  id: string = 'id',
) {
  const {
    state: { isRequestPrevious, body },
  } = table
  const [filters, setFilters] = React.useState([])
  const [oldfilters, setOldFilters] = React.useState([])
  const [filterId, setFilterId] = React.useState('')

  function onChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event
    setFilterId(value)
    const idIndex = filters.findIndex((obj) => obj?.field === id)
    if (idIndex > -1) {
      if (value === '') {
        setFilters((oldFilter) => oldFilter.filter((data) => data?.field !== id))
      } else {
        const updateId = filters.map((data, i) => {
          if (i === idIndex) {
            return { ...data, from_value: `%${value}%` }
          }
          return { ...data }
        })
        setFilters(updateId)
      }
    } else {
      setFilters([
        ...filters,
        {
          field: id,
          option: 'CP',
          from_value: `%${value}%`,
          data_type: 'S',
        },
      ])
    }
  }

  React.useEffect(() => {
    if (isRequestPrevious) {
      setFilters(body.filters)
      setOldFilters(body.filters)
      setFilterId(body.filters.find((f) => f.field === id)?.from_value.replaceAll('%', '') || '')
    } else {
      table.handler.handleFilter(filters)
      setFilterId(filters.find((f) => f.field === id)?.from_value.replaceAll('%', '') || '')
    }
  }, [isRequestPrevious, filters])

  return {
    filters,
    setFilters,
    oldfilters,
    filterId,
    setFilterId,
    onChangeSearch,
  }
}
