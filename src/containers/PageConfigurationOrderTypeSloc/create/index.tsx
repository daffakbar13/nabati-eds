import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Form, Tabs } from 'antd'
import {
  // updateProductIntraChannel,
  CreateOrderTypetoSloc,
} from 'src/api/logistic/configuration-order-type-to-sloc'
import { PATH } from 'src/configs/menus'
import { Spacer } from 'pink-lava-ui'
import CreateNewOrderTypeSLoc from './FieldNewCreate'
import CreateCopyFormBranch from './FieldCopyFromBranch'

interface OrderType {
  order_type: string
  sloc_id: string
}

interface FormData {
  branch_from: string
  order_type_sloc: Array<OrderType>
  branch_to: Array<String>
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const [OrderTypeSloc, setOrderTypeSloc] = useState([])
  const [currentTab, setCurrentTab] = useState('1')
  const isOnEditMode = !!payload

  const initialValue = { branch_from: 'P122', order_type_sloc: OrderTypeSloc }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onClickSubmit = async () => {
    setConfirmModal(true)
  }

  const doUpdate = async (reqBody: any) => {
    // try {
    //   setLoading(true)
    //   const res = updateProductIntraChannel(
    //     reqBody.trans_id as string,
    //     reqBody.gt_id as string,
    //     reqBody,
    //   )
    //   setLoading(false)
    //   return res
    // } catch (error) {
    //   return error
    // }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = CreateOrderTypetoSloc(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    setDataForm(undefined)
    const reqBody = { ...initialValue, ...dataForm }

    if (!isOnEditMode) {
      return doCreate(reqBody)
    }

    if (isOnEditMode) {
      return doUpdate(reqBody)
    }

    return false
  }

  const handleCancel = () => {
    setConfirmModal(false)
    close()
    form.setFieldsValue({
      branch: undefined,
      order_type: undefined,
      sloc: undefined,
    })
  }

  useEffect(() => {
    if (!isOnEditMode) return
    onChangeForm('trans_type', payload.trans_type)
    onChangeForm('product_gt', payload.product_gt)
    onChangeForm('product_mt', payload.product_mt)
    onChangeForm('trans_id', payload.trans_type)
    onChangeForm('gt_id', payload.product_gt)
  }, [isOnEditMode, payload])

  const AllTabs = [
    { label: 'New Create', key: '1' },
    { label: 'Copy From Branch', key: '2' },
  ]

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
        <Tabs
          defaultActiveKey="1"
          onChange={(asd) => {
            setCurrentTab(asd)
          }}
          items={AllTabs}
        />
        {currentTab === '1' ? (
          <CreateNewOrderTypeSLoc onChangeForm={onChangeForm} setOrderTypeSloc={setOrderTypeSloc} />
        ) : (
          <CreateCopyFormBranch onChangeForm={onChangeForm} />
        )}
      </Form>
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'Update Order Type to SLoc' : 'Create Order Type to SLoc'}
        open={visible}
        onOk={onClickSubmit}
        onCancel={handleCancel}
        content={content}
        loading={loading}
        cancelText="Cancel"
        okText={isOnEditMode ? 'Update' : 'Create'}
      />
      <Modal
        title={isOnEditMode ? 'Confirm Edit' : 'Confirm Submit'}
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content="Are you sure want to submit order type to sloc?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/configuration-order-type-to-sloc`)
        }}
        successContent={(res: any) => 'order type to sLoc has been successfully Submited'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
