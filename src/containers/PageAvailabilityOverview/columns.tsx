/* eslint-disable */
import { addColumn } from 'src/utils/createColumns'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'
import { Row, Col } from 'antd'
import ControlledExpandIcon from 'src/components/ControlledExpandIcon'
import TaggedStatus from 'src/components/TaggedStatus'

export const columns = [
  addColumn({
    title: 'Material',
    dataIndex: 'material',
    fixed: true,
    width: 900,
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch',
    fixed: true,
  }),
  addColumn({
    title: 'Sloc',
    dataIndex: 'sloc',
  }),
  addColumn({
    title: 'Status',
    dataIndex: 'status',
    render: (status, rec) => <TaggedStatus status={status} />,
  }),
  addColumn({
    title: 'Status Data',
    dataIndex: 'status_data',
  }),
  addColumn({
    title: 'Stock',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'stock_large',
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'stock_middle',
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'stock_small',
      }),
      addColumn({
        title: 'Total in large',
        dataIndex: 'stock_in_large',
      }),
      addColumn({
        title: 'Total in small',
        dataIndex: 'stock_in_small',
      }),
    ],
  }),
  addColumn({
    title: 'Booking Order',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'bo_large',
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'bo_middle',
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'bo_small',
      }),
      addColumn({
        title: 'Total in large',
        dataIndex: 'bo_in_large',
      }),
      addColumn({
        title: 'Total in small',
        dataIndex: 'bo_in_small',
      }),
    ],
  }),
  addColumn({
    title: 'Available Stock',
    children: [
      addColumn({
        title: 'Large',
        dataIndex: 'available_large',
      }),
      addColumn({
        title: 'Middle',
        dataIndex: 'available_middle',
      }),
      addColumn({
        title: 'Small',
        dataIndex: 'available_small',
      }),
      addColumn({
        title: 'Total in large',
        dataIndex: 'available_in_large',
      }),
      addColumn({
        title: 'Total in small',
        dataIndex: 'available_in_small',
      }),
    ],
  }),
]
