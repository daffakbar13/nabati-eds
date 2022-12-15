import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { InputNumber } from 'antd'
import {
  fieldSalesOrganization,
  fieldChannelCompany,
  fieldCustomerGroupCompany,
  fieldSalesmanGroup,
  fieldUomList,
} from 'src/configs/fieldFetches'
import {
  updateSalesORGCustomerGroupCustomerGroup,
  createSalesORGCustomerGroupCustomerGroup,
} from 'src/api/logistic/config-salesorg-customer-group-salesman-group'
import { PATH } from 'src/configs/menus'

interface FormData {
  company_id: string
  sales_org_id: string
  channel_id: string
  customer_group_id: string
  salesman_group_id: string
  min_line: number
  min_qty: number
  uom: string
  min_amount: number
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const [placeHolder, setPlaceHolder] = useState<FormData>()
  const [optionUom, setOptionsUom] = useState([])
  const isOnEditMode = !!payload

  const initialValue = {
    company_id: 'PP01',
    sales_org_id: 'P1D1',
    channel_id: '12',
    customer_group_id: '15',
    salesman_group_id: '20',
    min_line: 5,
    min_qty: 10,
    uom: 'CTN',
    min_amount: 59.091,
  }

  const styleInputNumber = {
    border: '1px solid #AAAAAA',
    borderRadius: 8,
    height: 46,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const changePlaceHolder = (form: string, value: any) => {
    setPlaceHolder((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onClickSubmit = async () => {
    setConfirmModal(true)
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateSalesORGCustomerGroupCustomerGroup(
        reqBody.company_id as string,
        reqBody.sales_org_id as string,
        reqBody.channel_id as string,
        reqBody.customer_group_id as string,
        reqBody.salesman_group_id as string,
        reqBody.min_line as string,
        reqBody,
      )
      setLoading(false)
      return res
    } catch (error) {
      console.error(error)
    }
    return false
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createSalesORGCustomerGroupCustomerGroup(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      console.error(error)
    }
    return false
  }

  const handleSubmit = async () => {
    setPlaceHolder(undefined)
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
    setPlaceHolder(undefined)
    close()
  }

  useEffect(() => {
    if (!isOnEditMode) return
    onChangeForm('company_id', payload.company_id)
    onChangeForm('sales_org_id', payload.sales_org_id)
    onChangeForm('channel_id', payload.channel_id)
    onChangeForm('customer_group_id', payload.customer_group_id)
    onChangeForm('salesman_group_id', payload.salesman_group_id)
    onChangeForm('min_line', payload.min_line)
    onChangeForm('min_qty', payload.min_qty)
    onChangeForm('uom', payload.uom)
    onChangeForm('min_amount', payload.min_amount)

    changePlaceHolder('company_id', `${payload.company_id || ''} - ${payload.company_name || ''}`)
    changePlaceHolder(
      'sales_org_id',
      `${payload.salesman_group_id || ''} - ${payload.sales_org_name || ''}`,
    )
    changePlaceHolder('channel_id', `${payload.channel_id || ''} - ${payload.channel_name || ''}`)
    changePlaceHolder(
      'customer_group_id',
      `${payload.customer_group_id || ''} - ${payload.customer_group_name || ''}`,
    )
    changePlaceHolder(
      'salesman_group_id',
      `${payload.salesman_group_id || ''} - ${payload.salesman_group_name || ''}`,
    )
    changePlaceHolder('min_line', payload.min_line)
    changePlaceHolder('min_qty', payload.min_qty)
    changePlaceHolder('uom', payload.uom)
    changePlaceHolder('min_amount', payload.min_amount)
  }, [isOnEditMode, payload])

  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Trans Type"
        required
        type="select"
        fetchOptions={fieldUomList}
        onChange={(val: any) => {
          onChangeForm('uom', val.value)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Product GT"
        required
        type="select"
        fetchOptions={fieldUomList}
        onChange={(val: any) => {
          onChangeForm('uom', val.value)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Product MT"
        required
        type="select"
        fetchOptions={fieldUomList}
        onChange={(val: any) => {
          onChangeForm('uom', val.value)
        }}
      />
      <Spacer size={10} />
    </>
  )

  return (
    <>
      <Modal
        title="View Mapping Product Intra"
        open={visible}
        onOk={onClickSubmit}
        onCancel={handleCancel}
        content={content}
        loading={loading}
        cancelText="Cancel"
        okText="Update"
      />
      <Modal
        title="Confirm Edit"
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content="Are you sure want to update mapping product intra?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/configuration-mapping-product-intra`)
        }}
        successContent={(res: any) => 'mapping product intra has been successfully Updated'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
