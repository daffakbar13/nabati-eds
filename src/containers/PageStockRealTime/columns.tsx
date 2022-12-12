/* eslint-disable */
import React from 'react'
import CreateColumns, { addColumn } from 'src/utils/createColumns'

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
  // CreateColumns('Sloc', 'sloc_id', true, (text) => <>{text}</>, 400),
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
    title: 'Material',
    dataIndex: 'group_by_sloc',
    fixed: true,
    render: (arr: any[], record) =>
      arr.map((a, ind) => {
        const isLast = arr.length === ind + 1
        return (
          <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.product_id} - {a.product_name}
          </p>
        )
      }),
  }),
  // CreateColumns(
  //   'Material',
  //   'product_id',
  //   true,
  //   (productId, record) => <>{`${productId} - ${record.product_name}`}</>,
  //   400,
  // ),
  addColumn({
    title: 'Stock',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'group_by_sloc',
        render: (arr: any[] = []) => {
          console.log('arr', arr)
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.large || '-'}
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
                {a.middle || '-'}
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
                {a.small || '-'}
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
                {a.total_in_large || '-'}
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
                {a.total_in_small || '-'}
              </p>
            )
          })
        },
      }),
    ],
  }),
]
