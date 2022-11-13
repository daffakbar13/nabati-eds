import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const DEFAULT_LIMIT = 20
export default function useSimpleTable({ columns, funcApi }) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({ total: 0 })
    const router = useRouter();

    const onChangePage = (page: number, limit: number) => {
        router.push(
            {
                ...router,
                query: { ...router.query, page, limit },
            },

        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await funcApi({
                    filters: [],
                    search: router.query.search,
                    limit: +router.query.limit || DEFAULT_LIMIT,
                    page: +router.query.page || 1,
                })
                setData(res?.data?.result ?? res?.data?.results ?? [])
                setPagination((prev) => ({
                    ...prev,
                    total: res.data.total_rows,
                }))
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error)
            }
        }

        fetchData()
    }, [funcApi, router.query.limit, router.query.page, router.query.search])

    return (
        {
            loading,
            data,
            columns: [...columns],
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
                showTotal: (total: number, range: number[]) => `Showing ${range[0]}-${range[1]} of ${total} items`,
                onChange: onChangePage,
            },
            // rowSelection: '', // TO DO NEXT
        }
    )
}
