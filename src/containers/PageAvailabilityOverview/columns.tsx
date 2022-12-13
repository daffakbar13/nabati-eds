/* eslint-disable */
import { addColumn } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_id',
    fixed: true,
    render: (text, rec) => (
      <>
        {text}-{rec.branch_name}
      </>
    ),
  }),
  addColumn({
    title: 'Material',
    dataIndex: 'product_id',
    fixed: true,
    render: (text, rec) => (
      <>
        {text}-{rec.product_name}
      </>
    ),
  }),
  addColumn({
    title: 'SLoc',
    dataIndex: 'group_by_sloc',
    fixed: true,
    render: (arr: any[], record) =>
      arr.map((a, ind) => {
        const isLast = arr.length === ind + 1
        return (
          <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.sloc_id}
          </p>
        )
      }),
  }),
  addColumn({
    title: 'Status Data',
    dataIndex: 'group_by_sloc',
    render: (arr: any[] = []) => {
      console.log('arr', arr)
      return arr.map((a, ind) => {
        const isLast = arr?.length === ind + 1
        return (
          <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.status_data || '-'}-{a.status_description}
          </p>
        )
      })
    },
  }),
  addColumn({
    title: 'Stock',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.stock?.large || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.stock?.middle || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.stock?.small || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in large',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.stock?.total_in_large || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in small',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.stock?.total_in_small || '-'}
              </p>
            )
          })
        },
      }),
      // addColumn({
      //   title: 'Total In Small',
      //   dataIndex: 'stock total small',
      //   render: (stock, record) => <>{record.stock.total_in_small}</>,
      // }),
      // addColumn({
      //   title: 'Total In Large',
      //   dataIndex: 'stock total large',
      //   render: (stock, record) => <>{record.stock.total_in_large}</>,
      // }),
    ],
  }),
  addColumn({
    title: 'Booking Order',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.booking_order?.large || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.booking_order?.middle || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.booking_order?.small || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in large',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.booking_order?.total_in_large || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in small',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.booking_order?.total_in_small || '-'}
              </p>
            )
          })
        },
      }),
    ],
  }),
  addColumn({
    title: 'Available Stock',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.available?.large || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.available?.middle || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.available?.small || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in large',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.available?.total_in_large || '-'}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in small',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.available?.total_in_small || '-'}
              </p>
            )
          })
        },
      }),
    ],
  }),
]
