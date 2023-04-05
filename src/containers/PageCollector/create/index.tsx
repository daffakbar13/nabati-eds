import { Form, Select } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldBranchAll, fieldCustomerByID, fieldCompanyList } from 'src/configs/fieldFetches'
import { createCollector, updateCollector } from 'src/api/collector'
import { Text as Texts } from 'pink-lava-ui'

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [optionsCustomer, setOptionsCustomer] = useState([])
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmCancelModal, setConfirmCancelModal] = useState(false)
  const [dataForm, setDataForm] = useState<any>()
  const [form] = Form.useForm()
  const router = useRouter()

  const isOnEditMode = !!payload

  // const initialValue = {
  //   company_id: 'PP01',
  // }

  const onSearchCustomer = async (value: any) => {
    fieldCustomerByID(value).then((newOptions) => {
      setOptionsCustomer([...newOptions])
    })
  }

  useEffect(() => {
    fieldCustomerByID('').then((res) => {
      setOptionsCustomer(res)
    })
  }, [])

  useEffect(() => {
    // form.resetFields()
    if (!isOnEditMode) return
    const fetchData = async () => {
      form.setFieldsValue({
        name: payload?.name,
        company_id: `${payload?.company_id} - ${payload?.company_name}`,
        branch_id: `${payload?.branch_id} - ${payload?.branch_name}`,
        customer_ids: payload?.customers.map((item) => `${item?.id} - ${item?.name}`),
      })
      setDataForm({
        id: payload?.id,
        name: payload?.name,
        company_id: payload?.company_id,
        branch_id: payload?.branch_id,
        customer_ids: payload?.customers.map((item) => item.id),
      })
    }

    fetchData()
  }, [form, isOnEditMode, payload])

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateCollector(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createCollector(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    // const reqBody = { ...initialValue, ...dataForm }
    // const reqBody = isOnEditMode ? { ...{ id: payload?.id }, ...dataForm } : { ...dataForm }
    const reqBody = { ...dataForm }

    // console.log(reqBody)
    if (!isOnEditMode) {
      // reqBody['customer_ids'] = [dataForm.customer_ids]
      setDataForm(undefined)
      return doCreate(reqBody)
    }

    if (isOnEditMode) {
      // reqBody['customer_ids'] = [dataForm.customer_ids]
      setDataForm(undefined)
      return doUpdate(reqBody)
    }

    return false
  }

  const onClickSubmit = async () => {
    await form.validateFields()
    setConfirmModal(true)
  }

  const handleCancel = () => {
    if (dataForm) {
      setConfirmCancelModal(true)
    } else {
      setDataForm(null)
      setConfirmModal(false)
      form.resetFields()
      close()
    }
  }

  const content = (
    <>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        requiredMark={false}
        scrollToFirstError
      >
        {/* <Spacer size={20} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="id"
          rules={[{ required: true }]}
        >
          <DebounceSelect
            label="ID"
            required
            type="input"
            placeholder="e.g ID"
            maxLength={10}
            onChange={(val: any) => {
              onChangeForm('id', val.target.value)
            }}
          />
        </Form.Item> */}
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="name">
          <DebounceSelect
            label="Name"
            type="input"
            placeholder="e.g Name"
            onChange={(val: any) => {
              onChangeForm('name', val.target.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="company_id">
          <DebounceSelect
            label="Company"
            type="select"
            placeholder="e.g Company"
            fetchOptions={fieldCompanyList}
            onChange={(val: any) => {
              onChangeForm('company_id', val.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item style={{ marginBottom: 0, paddingBottom: 0 }} name="branch_id">
          <DebounceSelect
            label="Branch"
            type="select"
            placeholder="e.g Branch"
            fetchOptions={fieldBranchAll}
            onChange={(val: any) => {
              onChangeForm('branch_id', val.value)
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="customer_ids"
          label={
            <Texts
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Customer
            </Texts>
          }
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
            onSearch={(search) => onSearchCustomer(search)}
            options={optionsCustomer || []}
            onChange={(val: any) => {
              onChangeForm(
                'customer_ids',
                val?.map(function (obj) {
                  return obj.value
                }),
              )
              setOptionsCustomer([])
            }}
          />
        </Form.Item>
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Collector ' : 'Create Collector'}
        open={visible}
        onOk={onClickSubmit}
        onCancel={handleCancel}
        content={content}
        loading={loading}
        cancelText="Cancel"
        okText={isOnEditMode ? 'Update' : 'Submit'}
      />
      <Modal
        title={isOnEditMode ? 'Confirm Edit' : 'Confirm Submit'}
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content="Are you sure want to submit Collector?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(router.asPath)
        }}
        successContent={(res: any) => (
          <>
            {isOnEditMode
              ? 'Collector has been successfully updated'
              : 'Collector has been successfully created'}
          </>
        )}
        successOkText="OK"
        width={432}
      />
      <Modal
        title={'Confirm Cancellation'}
        open={showConfirmCancelModal}
        onOk={() => {
          setDataForm(null)
          setConfirmCancelModal(false)
          form.resetFields()
          close()
        }}
        onCancel={() => {
          setConfirmCancelModal(false)
        }}
        content="Are you sure want to cancel? Change you made so far will not safed"
        width={432}
      />
    </>
  )
}
