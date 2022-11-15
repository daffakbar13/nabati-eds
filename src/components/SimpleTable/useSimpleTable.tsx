import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Checkbox, Popover, Divider, message } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

const HideShowColumns = ({ initialColumns, toggleTable, resetColumns }) => {
    const content = (
        <div style={{ fontWeight: 'bold' }}>
            <h4 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Hide/Show Columns
            </h4>
            {initialColumns.map(({ title, active }, ind: number) => (
                <div key={ind} style={{ display: 'flex', gap: 10 }}>
                    <Checkbox
                        checked={active}
                        onChange={(e) => toggleTable(ind, e.target.checked)}
                    />
                    <p
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => toggleTable(ind, !active)}>{title}</p>
                </div>
            ))}
            <Divider style={{ margin: '10px 0' }} />
            <h4
                onClick={resetColumns}
                style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    cursor: 'pointer',
                    color: '#EB008B',
                }}

            >
                Reset
            </h4>
        </div>
    )
    return (
        <Popover placement="bottomRight" content={content} trigger="click">
            <div style={{ width: 30, marginLeft: 'auto', cursor: 'pointer' }}>
                <MoreOutlined />
            </div>
        </Popover>
    )
}

const DEFAULT_LIMIT = 20
export default function useSimpleTable({ columns, funcApi, filters }) {
    const [loading, setLoading] = useState(false)
    const [dataSource, setData] = useState([])
    const router = useRouter();

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
        if (isOnlyOneLeft && !checked) return message.warning('You can not hide all column');

        setCurrentColumns(currentColumns.map((currColumn: any, ind: number) => {
            if (columnIndex === ind) return { ...currColumn, active: checked }
            return currColumn
        }))
    }

    const resetColumns = () => setCurrentColumns(initialColumns.current)

    // Fetch Data
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

    const additionalColumns = {
        title: <HideShowColumns
            initialColumns={currentColumns}
            toggleTable={toggleTable}
            resetColumns={resetColumns} />,
        fixed: 'right',
        width: 50,
    }

    return (
        {
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
                showTotal: (total: number, range: number[]) => `Showing ${range[0]}-${range[1]} of ${total} items`,
                onChange: onChangePage,
            },
            // rowSelection: '', // TO DO NEXT
        }
    )
}
