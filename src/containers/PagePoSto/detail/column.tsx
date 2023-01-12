/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React from 'react'
import CreateColumns from 'src/utils/createColumns'

export const columns = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1),
  CreateColumns('Item', 'product_id', false, (text: string, record: any) => (
    <>{`${record.product_id || ''} - ${record.description || ''}`}</>
  )),
  CreateColumns('Qty', 'qty', false),
  CreateColumns('UoM', 'uom_id', false),
  CreateColumns('Batch', 'batch', false),
]

export const columnsMT = [
  CreateColumns('No', 'id', false, (text: string, record: any, index: number) => index + 1),
  CreateColumns('Item Sender', 'product_id', false, (text: string, record: any) => (
    <>{`${record.product_id || ''} - ${record.description || ''}`}</>
  )),
  CreateColumns('Item Receiver', 'product_id', false, (text: string, record: any) => (
    <>{`${record.product_receiver_id || ''} - ${record.product_receiver_name || ''}`}</>
  )),
  CreateColumns('Qty', 'qty', false),
  CreateColumns('UoM', 'uom_id', false),
  CreateColumns('Batch', 'batch', false),
]
