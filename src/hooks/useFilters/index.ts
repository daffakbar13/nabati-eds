/* eslint-disable operator-linebreak */
import React from 'react'
import { colors } from 'src/configs/colors'
import { useAppContext } from 'src/contexts'
import useTable from '../useTable'

interface SearchProps {
  placeholder?: string
  width?: string
  nameIcon?: string
  colorIcon?: string
  value?: string
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  allowClear?: boolean
}

export default function useFilters(
  /**
   * Return of Hooks Table
   */
  table: ReturnType<typeof useTable>,
  /**
   * Placeholder of Search Input
   */
  placeholder: string = 'Search ID',
  /**
   * Column Name of ID
   */
  id: string = 'id',
) {
  const {
    state: { body },
  } = table
  const app = useAppContext()
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

  const searchProps: SearchProps = {
    allowClear: true,
    colorIcon: colors.grey.regular,
    nameIcon: 'SearchOutlined',
    onChange: (e) => onChangeSearch(e),
    placeholder,
    value: filterId,
    width: '380px',
  }

  React.useEffect(() => {
    if (app.state.isRequestPrevious) {
      setFilters(body.filters)
      setOldFilters(body.filters)
      setFilterId(body.filters.find((f) => f.field === id)?.from_value.replaceAll('%', '') || '')
    } else {
      table.handler.handleFilter(filters)
      setFilterId(filters.find((f) => f.field === id)?.from_value.replaceAll('%', '') || '')
    }
  }, [app.state.isRequestPrevious, filters])

  return {
    filters,
    setFilters,
    oldfilters,
    filterId,
    setFilterId,
    onChangeSearch,
    searchProps,
  }
}
