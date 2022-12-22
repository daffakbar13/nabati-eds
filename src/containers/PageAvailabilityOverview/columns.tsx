/* eslint-disable */
import { addColumn } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'
import { Tag, Row, Col } from 'antd'
import ControlledExpandIcon from 'src/components/ControlledExpandIcon'

export const columns = [
  addColumn({
    title: 'Branch',
    dataIndex: 'branch_id',
    fixed: true,
    width: 900,
    render: (text, rec) => (
      <Row>
        <Col span={4}>
          <ControlledExpandIcon
            expanded={true}
            onChange={(expanded) => {
              console.log('expanded', expanded)
            }}
          />
        </Col>
        <Col span={20}>
          {text}-{rec.branch_name}
        </Col>
      </Row>
    ),
  }),
  addColumn({
    title: 'Material',
    dataIndex: 'group_by_product',
    fixed: true,
    render: (arr: any[] = []) => {
      return arr.map((a, ind) => {
        const isLast = arr?.length === ind + 1
        return (
          <p key={a.product_id} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.product_id}-{a.product_name}
          </p>
        )
      })
    },
  }),
  addColumn({
    title: 'Sloc',
    dataIndex: 'group_by_product',
    render: (arr: any[] = []) => {
      console.log('arr :', arr)
      return arr.map((a, ind) => {
        const isLast = arr?.length === ind + 1
        return (
          <p key={a.group_by_sloc.sloc_id} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.group_by_sloc.sloc_id}
          </p>
        )
      })
    },
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'group_by_product',
    render: (arr: any[] = []) => {
      return arr.map((a, ind) => {
        const isLast = arr?.length === ind + 1
        return (
          <div key={a.group_by_sloc.status_description} style={{ marginBottom: isLast ? 0 : 16 }}>
            <Tag color={a.group_by_sloc.status_description === 'PGI Complete' ? 'green' : ''}>
              {a.group_by_sloc.status_description}
            </Tag>
          </div>
        )
      })
    },
  }),
  addColumn({
    title: 'Status Data',
    dataIndex: 'group_by_product',
    render: (arr: any[] = []) => {
      console.log('arr', arr)
      return arr.map((a, ind) => {
        const isLast = arr?.length === ind + 1
        return (
          <p key={a.group_by_sloc.status_description} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.group_by_sloc.status_data}-{a.group_by_sloc.status_description}
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
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.group_by_sloc.stock.large} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.group_by_sloc.stock.large}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.group_by_sloc.stock.middle} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.group_by_sloc.stock.middle}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.group_by_sloc.stock.small} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.group_by_sloc.stock.small}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in large',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p
                key={a.group_by_sloc.stock.total_in_large}
                style={{ marginBottom: isLast ? 0 : 16 }}
              >
                {a.group_by_sloc.stock.total_in_large}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in small',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p
                key={a.group_by_sloc.stock.total_in_small}
                style={{ marginBottom: isLast ? 0 : 16 }}
              >
                {a.group_by_sloc.stock.total_in_small}
              </p>
            )
          })
        },
      }),
    ],
  }),
  addColumn({
    title: 'Booking Order',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p
                key={a.group_by_sloc.booking_order.large}
                style={{ marginBottom: isLast ? 0 : 16 }}
              >
                {a.group_by_sloc.booking_order.large}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p
                key={a.group_by_sloc.booking_order.middle}
                style={{ marginBottom: isLast ? 0 : 16 }}
              >
                {a.group_by_sloc.booking_order.middle}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p
                key={a.group_by_sloc.booking_order.small}
                style={{ marginBottom: isLast ? 0 : 16 }}
              >
                {a.group_by_sloc.booking_order.small}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in large',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p
                key={a.group_by_sloc.booking_order.total_in_large}
                style={{ marginBottom: isLast ? 0 : 16 }}
              >
                {a.group_by_sloc.booking_order.total_in_large}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in small',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p
                key={a.group_by_sloc.booking_order.total_in_small}
                style={{ marginBottom: isLast ? 0 : 16 }}
              >
                {a.group_by_sloc.booking_order.total_in_small}
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
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.group_by_sloc.available.large} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.group_by_sloc.available.large}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.group_by_sloc.available.middle} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.group_by_sloc.available.middle}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p key={a.group_by_sloc.available.small} style={{ marginBottom: isLast ? 0 : 16 }}>
                {a.group_by_sloc.available.small}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in large',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p
                key={a.group_by_sloc.available.total_in_large}
                style={{ marginBottom: isLast ? 0 : 16 }}
              >
                {a.group_by_sloc.available.total_in_large}
              </p>
            )
          })
        },
      }),
      addColumn({
        title: 'Total in small',
        dataIndex: 'group_by_product',
        render: (arr: any[] = []) => {
          return arr.map((a, ind) => {
            const isLast = arr?.length === ind + 1
            return (
              <p
                key={a.group_by_sloc.available.total_in_small}
                style={{ marginBottom: isLast ? 0 : 16 }}
              >
                {a.group_by_sloc.available.total_in_small}
              </p>
            )
          })
        },
      }),
    ],
  }),
]
