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
          <p key={a.group_by_product.product_id} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.group_by_product.product_id} - {a.group_by_product.product_name}
          </p>
        )
      }),
  }),
  addColumn({
    title: 'Large',
    dataIndex: 'group_by_sloc',
    fixed: true,
    render: (arr: any[], record) =>
      arr.map((a, ind) => {
        const isLast = arr.length === ind + 1
        return (
          <p key={a.group_by_product.large} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.group_by_product.large}
          </p>
        )
      }),
  }),
  addColumn({
    title: 'Middle',
    dataIndex: 'group_by_sloc',
    fixed: true,
    render: (arr: any[], record) =>
      arr.map((a, ind) => {
        const isLast = arr.length === ind + 1
        return (
          <p key={a.group_by_product.middle} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.group_by_product.middle}
          </p>
        )
      }),
  }),
  addColumn({
    title: 'Small',
    dataIndex: 'group_by_sloc',
    fixed: true,
    render: (arr: any[], record) =>
      arr.map((a, ind) => {
        const isLast = arr.length === ind + 1
        return (
          <p key={a.group_by_product.small} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.group_by_product.small}
          </p>
        )
      }),
  }),
  addColumn({
    title: 'Total in Small',
    dataIndex: 'group_by_sloc',
    fixed: true,
    render: (arr: any[], record) =>
      arr.map((a, ind) => {
        const isLast = arr.length === ind + 1
        return (
          <p key={a.group_by_product.total_in_small} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.group_by_product.total_in_small}
          </p>
        )
      }),
  }),
  addColumn({
    title: 'Total in Large',
    dataIndex: 'group_by_sloc',
    fixed: true,
    render: (arr: any[], record) =>
      arr.map((a, ind) => {
        const isLast = arr.length === ind + 1
        return (
          <p key={a.group_by_product.total_in_large} style={{ marginBottom: isLast ? 0 : 16 }}>
            {a.group_by_product.total_in_large}
          </p>
        )
      }),
  }),
]
