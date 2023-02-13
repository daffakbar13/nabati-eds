/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import React from 'react'
import { addColumn } from 'src/utils/createColumns'
import { ICDelete } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import { SLOC_TYPES_OPTIONS } from 'src/configs/slocTypes'

interface slocList {
  company_id?: string
  branch_id?: string
  sales_org: string
  sloc_id: string
  sloc_name: string
  sloc_type: string
}

export const useTableAddItem = (payload: any, isOnEditMode: boolean) => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  function handleChangeData(key: string, value: string | number, index: number) {
    setData((old) => old.map((obj, i) => ({ ...obj, ...(index === i && { [key]: value }) })))
  }

  function handleDeleteRows(index: number) {
    setData(data.filter((_, i) => i !== index))
  }

  function handleAddItem(slocList: slocList) {
    setData([...data, slocList])
  }

  function resetItem() {
    setData([])
  }

  React.useEffect(() => {
    if (payload) {
      const newData = {
        company_id: payload?.company_id,
        branch_id: payload?.branch_id,
        sales_org: payload?.sales_org,
        sloc_id: payload?.sloc_id,
        sloc_name: payload?.sloc_function,
        sloc_type: payload?.sloc_type,
        // sloc_type: payload?.sloc_type == 'I' ? 'Intra Sloc' : 'Canvas',
      }
      if (payload.children) {
        const newDataChild = payload.children?.map((item: any, index) => ({
          company_id: item?.company_id,
          branch_id: item?.branch_id,
          sales_org: item?.sales_org,
          sloc_id: item?.sloc_id,
          sloc_name: item?.sloc_function,
          sloc_type: item?.sloc_type,
        }))
        setData([newData, ...newDataChild])
      } else {
        setData([newData])
      }
    }
  }, [isOnEditMode, payload])

  const columns = [
    addColumn({
      render: (_, __, index) => (
        <div style={{ cursor: 'pointer' }} onClick={() => handleDeleteRows(index)}>
          <ICDelete />
        </div>
      ),
      width: 55,
      fixed: true,
    }),
    addColumn({
      title: 'Sloc ID',
      dataIndex: 'sloc_id',
    }),
    addColumn({
      title: 'Sloc Name',
      dataIndex: 'sloc_name',
    }),
    addColumn({
      title: 'Sloc Type',
      dataIndex: 'sloc_type',
      render: (sloc_type, record, index) => (
        <DebounceSelect
          type="select"
          value={sloc_type as any}
          options={SLOC_TYPES_OPTIONS}
          onChange={(e) => {
            handleChangeData('sloc_type', e.value, index)
          }}
        />
      ),
    }),
  ]

  return {
    data,
    handleAddItem,
    resetItem,
    columns,
    loading,
  }
}
