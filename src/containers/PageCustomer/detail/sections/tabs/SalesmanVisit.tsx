/* eslint-disable camelcase */
import React from 'react'
import { TableInformation } from 'src/components/TabCustomerInfo/types'
import { useSalesQuotationDetailContext } from 'src/hooks/contexts'
import { concatString } from 'src/utils/concatString'
import { Table } from 'pink-lava-ui'
import { AlignCenterOutlined, CheckCircleFilled, MinusCircleFilled } from '@ant-design/icons'

export default function SalesmanVisit() {
  const {
    state: { data },
  } = useSalesQuotationDetailContext()
  const { salesman } = data!

  const dataTable: TableInformation[] = salesman?.map(
    ({
      salesman_id,
      salesman_name,
      salesman_group_id,
      salesman_group_name,
      salesman_day,
      salesman_week_one,
      salesman_week_two,
      salesman_week_three,
      salesman_week_four,
      salesman_week_sequence,
    }) => {
      return {
        'Salesman Id': salesman_id,
        Name: salesman_name,
        'Salesman Group': concatString(salesman_group_id, salesman_group_name),
        Day: salesman_day,
        'Week one':
          salesman_week_one === true ? (
            <CheckCircleFilled style={{ color: '#00C572' }} />
          ) : (
            <MinusCircleFilled style={{ color: 'red' }} />
          ),
        'Week two':
          salesman_week_two === true ? (
            <CheckCircleFilled style={{ color: '#00C572' }} />
          ) : (
            <MinusCircleFilled style={{ color: 'red' }} />
          ),
        'Week three':
          salesman_week_three === true ? (
            <CheckCircleFilled style={{ color: '#00C572' }} />
          ) : (
            <MinusCircleFilled style={{ color: 'red' }} />
          ),
        'Week four':
          salesman_week_four === true ? (
            <CheckCircleFilled style={{ color: '#00C572' }} />
          ) : (
            <MinusCircleFilled style={{ color: 'red' }} />
          ),
        'Week sequence': salesman_week_sequence,
      }
    },
  )

  return (
    <>
      <Table
        dataSource={dataTable}
        columns={[
          { title: 'Salesman ID', dataIndex: 'Salesman Id' },
          { title: 'Name', dataIndex: 'Name' },
          { title: 'Salesman Group', dataIndex: 'Salesman Group' },
          { title: 'Day', dataIndex: 'Day' },
          { title: 'Week 1', dataIndex: 'Week one', align: 'center' },
          { title: 'Week 2', dataIndex: 'Week two', align: 'center' },
          { title: 'Week 3', dataIndex: 'Week three', align: 'center' },
          { title: 'Week 4', dataIndex: 'Week four', align: 'center' },
          { title: 'Sequence', dataIndex: 'Week sequence' },
        ]}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}
