/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { InputNumber } from 'antd'
import DebounceSelect from 'src/components/DebounceSelect'
import { productBranch, fieldUom } from 'src/configs/fieldFetches'
import { MinusCircleFilled } from '@ant-design/icons'
import { addColumn } from 'src/utils/createColumns'
import { Checkbox } from 'antd'

export const useTableAddItem = (props: any) => {
  const initialValue = {
    config_approval_name: '',
    is_active_config: 1,
    is_approved: 1,
  }
  const [data, setData] = useState([
    {
      config_approval_name: 'CREDIT LIMIT',
      config_approval_name_label: 'Credit Limit',
      is_active_config: 0,
      is_approved: 0,
    },
    {
      config_approval_name: 'MIN BLOCK CUSTOMER',
      config_approval_name_label: 'Min Block - Customer',
      is_active_config: 0,
      is_approved: 0,
    },
    {
      config_approval_name: 'MIN BLOCK CHANNEL',
      config_approval_name_label: 'Min Block - Channel',
      is_active_config: 0,
      is_approved: 0,
    },
    {
      config_approval_name: 'MIN BLOCK MATERIAL',
      config_approval_name_label: 'Min Block - Material',
      is_active_config: 0,
      is_approved: 0,
    },
    {
      config_approval_name: 'STATUS OVERDUE',
      config_approval_name_label: 'Status Overdue',
      is_active_config: 0,
      is_approved: 0,
    },
  ])

  const [fetching, setFetching] = useState(false)
  const [loading, setLoading] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [indeterminateApproval, setIndeterminateApproval] = useState(false)
  const [checkAll, setCheckAll] = useState(false)
  const [checkAllApproval, setCheckAllApproval] = useState(false)

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  const onCheckAllChange = (e) => {
    setData(
      data.map((item: any, index) => {
        return {
          ...item,
          is_active_config: e.target.checked ? 1 : 0,
        }
      }),
    )
  }

  const onCheckAllChangeApproval = (e) => {
    setData(
      data.map((item: any, index) => {
        return {
          ...item,
          is_approved: e.target.checked ? 1 : 0,
        }
      }),
    )
  }

  useEffect(() => {
    const configIndeterminate = data.filter((data) => data?.is_active_config === 1)
    const configIndeterminateApproval = data.filter((data) => data?.is_approved === 1)

    if (data.length === configIndeterminate.length) {
      setIndeterminate(false)
      setCheckAll(true)
    } else {
      setCheckAll(false)
      if (configIndeterminate.length > 0) {
        setIndeterminate(true)
      } else {
        setIndeterminate(false)
      }
    }

    if (data.length === configIndeterminateApproval.length) {
      setIndeterminateApproval(false)
      setCheckAllApproval(true)
    } else {
      setCheckAllApproval(false)
      if (configIndeterminateApproval.length > 0) {
        setIndeterminateApproval(true)
      } else {
        setIndeterminateApproval(false)
      }
    }
  }, [data])

  const columns = [
    addColumn({
      title: (
        <>
          <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={onCheckAllChange}>
            Config
          </Checkbox>
        </>
      ),
      dataIndex: 'config_approval_name_label',
      render: (text: string, record: any, index: number) => (
        <Checkbox
          checked={record.is_active_config === 1 ? true : false}
          onChange={(e) => {
            handleChangeData('is_active_config', e.target.checked ? 1 : 0, index)
          }}
        >
          {text}
        </Checkbox>
      ),
    }),
    addColumn({
      title: (
        <>
          <Checkbox
            indeterminate={indeterminateApproval}
            checked={checkAllApproval}
            onChange={onCheckAllChangeApproval}
          >
            Approval
          </Checkbox>
        </>
      ),
      dataIndex: 'is_approved',
      render: (text: number, record: any, index: number) => (
        <Checkbox
          checked={text === 1 ? true : false}
          onChange={(e) => {
            handleChangeData('is_approved', e.target.checked ? 1 : 0, index)
          }}
        ></Checkbox>
      ),
    }),
  ]

  return {
    data,
    columns,
    loading,
  }
}
