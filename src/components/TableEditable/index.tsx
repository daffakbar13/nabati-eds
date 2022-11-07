import { Form, Popconfirm, Typography } from 'antd'
import React, { useState } from 'react'
import { antdColumns } from 'src/configs/commonTypes'
import { NoDataFallback } from 'src/components'
import { Button, Table } from 'pink-lava-ui'

// import { columns as rawColumns } from './columns'
import { ICEdit, ICDelete, ICSave, ICPlusWhite } from 'src/assets'
import { EditableCellProps, TableEditableProps, recordType } from './types'

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  inputNode,
  ...restProps
}) => (
  <td {...restProps}>
    {editing ? (
      <Form.Item
        name={dataIndex}
        style={{ margin: 0 }}
        rules={[
          {
            required: true,
            message: `Please Input ${title}!`,
          },
        ]}
      >
        {inputNode}
      </Form.Item>
    ) : (
      children
    )}
  </td>
)

const TableEditable: React.FC<TableEditableProps> = ({ columns, data, setData }) => {
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState<React.Key>('')

  const isEditing = (record: { key: React.Key }) => record.key === editingKey

  const edit = (record: { key: React.Key }) => {
    // form.setFieldsValue({ name: '', age: '', address: '', ...record })
    form.setFieldsValue({ ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: React.Key) => {
    try {
      const row = await form.validateFields()

      const newData = [...data]
      const index = newData.findIndex((item: recordType) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const addNewData = () => {
    form.resetFields()

    const newData = { key: data.length.toString() }
    const oldData = data.map((i, ind) => ({ ...i, key: ind.toString() }))
    setData([...oldData, newData])
    form.setFieldsValue({})
    setEditingKey(newData.key)
  }

  const deleteRow = (key: React.Key) => {
    setData((prev: recordType[]) => prev.filter((i) => i.key !== key))
  }

  const columnsToRender = [
    {
      title: '',
      dataIndex: 'action',
      width: 100,
      render: (_: any, record: recordType) => {
        const editable = isEditing(record)
        return editable ? (
          <div
            style={{
              display: 'grid',
              alignItems: 'center',
              gap: 12,
              gridTemplateColumns: '30px  50px',
            }}
          >
            <Typography.Link onClick={() => save(record.key)}>
              <ICSave />
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={cancel}
              style={{ backgroundColor: 'transparent' }}
            >
              <a style={{ fontSize: 12 }}>Cancel</a>
            </Popconfirm>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gap: 12,
              gridTemplateColumns: '30px 30px',
            }}
          >
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              <ICEdit />
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteRow(record.key)}
              style={{ backgroundColor: 'transparent' }}
            >
              <ICDelete />
            </Popconfirm>
          </div>
        )
      },
    },
    ...columns,
  ]

  const mergedColumns = columnsToRender.map((col: antdColumns) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        inputNode: col.inputNode,
      }),
    }
  })

  console.log('data', data)

  return (
    <>
      <Button size="big" variant="primary" onClick={addNewData} style={{ margin: '32px 0 20px' }}>
        <ICPlusWhite /> Add New
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{ body: { cell: EditableCell } }}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
          locale={{ emptyText: <NoDataFallback /> }}
        />
      </Form>
    </>
  )
}

export default TableEditable
