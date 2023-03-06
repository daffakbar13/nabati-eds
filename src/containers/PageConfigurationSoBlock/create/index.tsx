import { useRouter } from 'next/router'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text, Table } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { InputNumber, Form, Divider } from 'antd'
import { fieldCompanyList, fieldSalesOrgCompanyDynamic } from 'src/configs/fieldFetches'
import { createConfigSoBlock } from 'src/api/logistic/configuration-approval-so-block'
import { PATH } from 'src/configs/menus'
import { useTableAddItem } from './useTableAddItem'
import { ICExclamation } from 'src/assets'

interface FormData {
  company_id: string
  sales_org_id: string
  is_active_company: number
}

export default function CreateModal({ visible = false, close = () => {} }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showConfirmModalCancel, setShowConfirmModalCancel] = useState(false)
  const [showErrorConfig, setShowErrorConfig] = useState(false)
  const [company, setCompany] = useState('PP01')
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const tableAddItems = useTableAddItem()

  const initialValue = {
    company_id: 'PP01',
    sales_org_id: 'PID1',
    is_active_company: 1,
    list_config: tableAddItems.data.filter(
      (dataAll) => dataAll?.is_active_config === 1 || dataAll?.is_approved === 1,
    ),
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onClickSubmit = async () => {
    const values = await form.validateFields()
    const configIndeterminate = tableAddItems.data.filter((data) => data?.is_active_config === 1)
    if (configIndeterminate.length > 0) {
      setShowErrorConfig(false)
      setConfirmModal(true)
    } else {
      setShowErrorConfig(true)
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createConfigSoBlock(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    setDataForm(undefined)
    const reqBody = { ...initialValue, ...dataForm }
    return doCreate(reqBody)
  }

  const handleCancel = () => {
    if (dataForm) {
      setShowConfirmModalCancel(true)
    } else {
      setDataForm(undefined)
      form.setFieldsValue({
        customer: undefined,
        credit_limit_before: undefined,
        credit_limit_after: undefined,
        valid_before: undefined,
        valid_after: undefined,
      })
      close()
    }
  }

  const handleOkCancelConfirm = () => {
    setDataForm(undefined)
    form.setFieldsValue({
      customer: undefined,
      credit_limit_before: undefined,
      credit_limit_after: undefined,
      valid_before: undefined,
      valid_after: undefined,
    })
    setShowConfirmModalCancel(false)
    close()
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
        <Spacer size={20} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="company"
          label={
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Company <span style={{ color: 'red' }}>*</span>
            </Text>
          }
          rules={[{ required: true }]}
        >
          <DebounceSelect
            required
            type="select"
            placeholder="e.g Company"
            fetchOptions={fieldCompanyList}
            onChange={(val: any) => {
              onChangeForm('company_id', val.value.split(' - ')[0])
              setCompany(val.value.split(' - ')[0])
            }}
          />
        </Form.Item>
        <Spacer size={10} />
        <Form.Item
          style={{ marginBottom: 0, paddingBottom: 0 }}
          name="sales_org_id"
          label={
            <Text
              variant="headingSmall"
              textAlign="center"
              style={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Sales Org. ID <span style={{ color: 'red' }}>*</span>
            </Text>
          }
          rules={[{ required: true }]}
        >
          <DebounceSelect
            required
            type="select"
            placeholder="e.g Sales Org. ID"
            fetchOptions={(search) => fieldSalesOrgCompanyDynamic(search, company)}
            onChange={(val: any) => {
              onChangeForm('sales_org_id', val.value.split(' - ')[0])
            }}
          />
        </Form.Item>
        <Divider />

        {showErrorConfig && (
          <>
            <div
              key={1}
              style={{
                marginTop: 10,
                color: '#FFF',
                background: '#b40e0e',
                borderRadius: 8,
                padding: '8px 16px',
                display: 'grid',
                gridTemplateColumns: '30px 1fr',
              }}
            >
              <ICExclamation />
              <p>No config selected yet</p>
            </div>
            <Spacer size={10} />
          </>
        )}
        <Table columns={tableAddItems.columns} data={tableAddItems.data} />
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={'Create Approval SO Block'}
        open={visible}
        onOk={onClickSubmit}
        onCancel={handleCancel}
        content={content}
        loading={loading}
        cancelText="Cancel"
        okText={'Create'}
      />
      <Modal
        title={'Confirm Cancellation'}
        open={showConfirmModalCancel}
        onOk={handleOkCancelConfirm}
        onCancel={() => {
          setShowConfirmModalCancel(false)
        }}
        content={'Are you sure want to cancel? Change you made so far will not saved'}
        loading={loading}
        width={432}
      />
      <Modal
        title={'Confirm Submit'}
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content={'Are you sure want to submit approval SO block?'}
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/configuration-approval-so-block`)
        }}
        successContent={(res: any) => 'approval SO block has been successfully created'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
