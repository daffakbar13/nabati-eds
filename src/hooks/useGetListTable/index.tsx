import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { message } from 'antd'
import HideShowColumns from './HideShowColumns'

const DEFAULT_LIMIT = 20
export default function useSimpleTable({ columns, funcApi, filters = [] }) {
  const [loading, setLoading] = useState(false)
  const [dataSource, setData] = useState([])
  const router = useRouter()

  // Pagination
  const [pagination, setPagination] = useState({ total: 0 })
  const onChangePage = (page: number, limit: number) => {
    router.push({
      ...router,
      query: { ...router.query, page, limit },
    })
  }

  // Columns
  const initialColumns = useRef(columns.map((c: any) => ({ ...c, active: true })))
  // const prevColumns = useRef(columns)
  const [currentColumns, setCurrentColumns] = useState(initialColumns.current)

  const toggleTable = (columnIndex: number, checked: boolean) => {
    // Prevent user to hides all column
    const isOnlyOneLeft = currentColumns.filter((c: any) => c.active).length === 1
    if (isOnlyOneLeft && !checked) return message.warning('You can not hide all column')

    return setCurrentColumns(
      currentColumns.map((currColumn: any, ind: number) => {
        if (columnIndex === ind) return { ...currColumn, active: checked }
        return currColumn
      }),
    )
  }

  const resetColumns = () => setCurrentColumns(initialColumns.current)

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        filters,
        limit: +router.query.limit || DEFAULT_LIMIT,
        page: +router.query.page || 1,
      }

      if (router?.query?.search) {
        payload?.filters?.push({
          field: 'id',
          option: 'CP',
          from_value: router.query.search,
          to_value: router.query.search,
        })
      }

      try {
        setLoading(true)
        const res = await funcApi(payload)
        setData(res?.data?.result ?? res?.data?.results ?? [])
        setPagination((prev) => ({
          ...prev,
          total: res.data.total_rows,
        }))
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchData()
  }, [funcApi, router.query.limit, router.query.page, router.query.search, filters])

  const additionalColumns = {
    title: (
      <HideShowColumns
        initialColumns={currentColumns}
        toggleTable={toggleTable}
        resetColumns={resetColumns}
      />
    ),
    fixed: 'right',
    width: 50,
  }

  return {
    loading,
    dataSource,
    columns: [...currentColumns.filter((c: any) => c.active), additionalColumns],
    pagination: {
      current: router.query.page ? +router.query.page : 1,
      defaultPageSize: router.query.limit ? +router.query.limit : DEFAULT_LIMIT,
      total: pagination.total,
      position: ['bottomLeft'],
      pageSizeOptions: [20, 50, 100],
      showLessItems: true,
      showSizeChanger: true,
      showQuickJumper: true,
      responsive: true,
      showTotal: (total: number, range: number[]) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `Showing ${range[0]}-${range[1]} of ${total} items`,
      onChange: onChangePage,
    },
    // rowSelection: '', // TO DO NEXT
  }
}
