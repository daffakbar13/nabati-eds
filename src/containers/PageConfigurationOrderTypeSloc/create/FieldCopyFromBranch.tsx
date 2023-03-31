import { useEffect, useState } from 'react'
import { Spacer, Text, Table } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Form, Select } from 'antd'
import { fieldBranchAll, fieldBranchSupply } from 'src/configs/fieldFetches'
import { getListOrderTypetoSloc } from 'src/api/logistic/configuration-order-type-to-sloc'
import { columns } from './columns'

export default function CreateCopyFormBranch({ onChangeForm }) {
  const [optionsBranchTO, setOptionsoptionsBranchTO] = useState([])
  const [selectedBranchFrom, setSelectedBranchFrom] = useState('')
  const [copyFromBranch, setCopyFromBranch] = useState<any>([])

  const onSearchBranch = async (value: any) => {
    fieldBranchSupply(value, '', selectedBranchFrom).then((newOptions) => {
      setOptionsoptionsBranchTO([...newOptions])
    })
  }

  useEffect(() => {
    if (selectedBranchFrom != '') {
      getListOrderTypetoSloc({
        filters: [
          {
            field: 'id',
            option: 'CP',
            from_value: `%${selectedBranchFrom}%`,
            data_type: 'S',
          },
        ],
        limit: 100,
        page: 1,
      }).then((result) => {
        setCopyFromBranch(result?.data?.result)
        onChangeForm(
          'order_type_sloc',
          result?.data?.result?.map((item: any, index) => ({
            order_type: item.order_type,
            sloc_id: item.sloc_id,
          })),
        )
      })
    }
  }, [selectedBranchFrom])

  return (
    <>
      <Form.Item
        style={{ marginBottom: 0, paddingBottom: 0 }}
        name="branch_from"
        label={
          <Text
            variant="headingSmall"
            textAlign="center"
            style={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Branch From <span style={{ color: 'red' }}> *</span>
          </Text>
        }
        rules={[{ required: true }]}
      >
        <DebounceSelect
          required
          type="select"
          fetchOptions={(search) => fieldBranchAll(search)}
          onChange={(val: any) => {
            onChangeForm('branch_from', val.value)
            setSelectedBranchFrom(val.value)
          }}
        />
      </Form.Item>
      {selectedBranchFrom !== '' && (
        <>
          <Spacer size={20} />
          <Table columns={columns} dataSource={copyFromBranch} />
          <Spacer size={20} />
        </>
      )}
      <Form.Item
        style={{ marginBottom: 0, paddingBottom: 0 }}
        name="branch_to"
        label={
          <Text
            variant="headingSmall"
            textAlign="center"
            style={{ fontSize: 16, fontWeight: 'bold' }}
          >
            Branch To <span style={{ color: 'red' }}> *</span>
          </Text>
        }
        rules={[{ required: true }]}
      >
        <Select
          mode="multiple"
          allowClear
          size="large"
          style={{
            width: '100%',
            border: '1px solid #AAAAAA',
            borderRadius: 8,
            minHeight: 48,
          }}
          placeholder="Type To Search"
          labelInValue
          onSearch={(search) => onSearchBranch(search)}
          options={optionsBranchTO || []}
          onChange={(val: any) => {
            onChangeForm(
              'branch_to',
              val?.map(function (obj) {
                return obj.value
              }),
            )
            setOptionsoptionsBranchTO([])
          }}
        />
      </Form.Item>
      <Spacer size={10} />
    </>
  )
}
