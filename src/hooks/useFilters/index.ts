/* eslint-disable operator-linebreak */
import React from 'react'
import { colors } from 'src/configs/colors'
import { useAppContext } from 'src/contexts'
import useTable from '../useTable'

type TableType = ReturnType<typeof useTable>
type FiltersType = TableType['state']['body']['filters']

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
  table: TableType,
  /**
   * Placeholder of Search Input
   */
  placeholder: string = 'Search ID',
  /**
   * Column Name of ID
   */
  id: string = 'id',
  /**
   * Column Name of ID
   */
  ids: string[] = ['id'],
) {
  const {
    state: { body },
  } = table
  const app = useAppContext()
  const [filters, setFilters] = React.useState<FiltersType>([])
  const [oldfilters, setOldFilters] = React.useState<FiltersType>([])
  const [filterId, setFilterId] = React.useState('')
  const [currentIdsIndex, setCurrentIdsIndex] = React.useState(-1)
  const [fetchFilters, setFetchFilters] = React.useState(false)

  function getCurrentId() {
    return ids[currentIdsIndex]
  }

  function getPrevId() {
    if (currentIdsIndex < 0) {
      return ids[0]
    }
    if (currentIdsIndex > 0) {
      return ids[currentIdsIndex - 1]
    }
    // if (currentIdsIndex === 0) {
    //   return ids[ids.length - 1]
    // }
    return ids[currentIdsIndex]
  }

  function onChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event
    setCurrentIdsIndex(0)
    setFilterId(value)
    setFetchFilters(true)
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
    if (table.state.data.length === 0) {
      if (currentIdsIndex < ids.length - 1) {
        setCurrentIdsIndex((prev) => prev + 1)
        setFetchFilters(true)
      } else {
        setCurrentIdsIndex(0)
        setFetchFilters(false)
      }
    }
  }, [table.state.data])

  React.useEffect(() => {
    if (app.state.isRequestPrevious) {
      setFilters(body.filters)

      setOldFilters(body.filters)
      setFilterId(
        body.filters.find((f) => f.field === getCurrentId())?.from_value.replaceAll('%', '') || '',
      )
    } else {
      table.handler.handleFilter(filters)
    }
  }, [app.state.isRequestPrevious, filters])

  React.useEffect(() => {
    const removedFilterID = filters.filter((f) => !ids.includes(f.field))

    if (fetchFilters) {
      if (filterId === '') {
        setFilters(removedFilterID)
      } else {
        setFilters([
          ...removedFilterID,
          {
            field: getCurrentId(),
            option: 'CP',
            data_type: 'S',
            from_value: `%${filterId}%`,
          },
        ])
      }
    }
    setFetchFilters(false)
  }, [fetchFilters])

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
