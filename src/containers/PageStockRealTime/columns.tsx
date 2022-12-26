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
    title: 'SLoc',
    dataIndex: 'sloc',
    fixed: true,
    width: 500,
  }),
  addColumn({
    title: 'Branch',
    dataIndex: 'branch',
    fixed: true,
    width: 950,
  }),
  addColumn({
    title: 'Material',
    dataIndex: 'material',
    fixed: true,
  }),
  addColumn({
    title: 'Large',
    dataIndex: 'large',
  }),
  addColumn({
    title: 'Middle',
    dataIndex: 'middle',
  }),
  addColumn({
    title: 'Small',
    dataIndex: 'small',
  }),
  addColumn({
    title: 'Total in Small',
    dataIndex: 'total_in_small',
  }),
  addColumn({
    title: 'Total in Large',
    dataIndex: 'total_in_large',
  }),
]
