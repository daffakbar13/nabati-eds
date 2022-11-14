import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const DEFAULT_LIMIT = 20
export default function useSimpleTable({ columns, funcApi, filters }) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({ total: 0 })
    const router = useRouter();

    const onChangePage = (page: number, limit: number) => {
        router.push({
            ...router,
            query: { ...router.query, page, limit },
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const payload = {
                filters: filters.map((f: any) => ({
                    field: f.field,
                    option: f.option,
                    data_type: f.dataType,
                    from_value: (() => {
                        if (!f.fromValue) return null
                        if (typeof f.fromValue === 'string') return f.fromValue
                        if (Array.isArray(f.fromValue)) return f.fromValue.map((i) => i.value)
                        return f.fromValue.value
                    })(),
                    to_value: (() => {
                        if (!f.toValue) return null
                        if (typeof f.toValue === 'string') return f.toValue
                        if (Array.isArray(f.toValue)) return f.toValue.map((i) => i.value)
                        return f.toValue.value
                    })(),
                })),
                limit: +router.query.limit || DEFAULT_LIMIT,
                page: +router.query.page || 1,
            }

            if (router.query.search) {
                // Jika ada search value
                payload.filters.push({
                    field: 'eds_order.id',
                    option: 'EQ',
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
                console.error(error)
            }
        }

        fetchData()
    }, [funcApi, router.query.limit, router.query.page, router.query.search, filters])

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
