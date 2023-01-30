import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { InputNumber } from 'antd'
import {
  fieldSalesOrganization,
  fieldItem,
  fieldCustomerGroupCompany,
  fieldUom,
} from 'src/configs/fieldFetches'
import {
  updateSalesORGCustomerGroupMaterial,
  createSalesORGCustomerGroupMaterial,
} from 'src/api/logistic/config-salesorg-customer-group-material'
import { PATH } from 'src/configs/menus'

interface FormData {
  sales_org_id: string
  customer_group_id: string
  product_id: string
  min_qty: number
  max_qty: number
  uom_id: string
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
    customer_group_id: '18',
    product_id: '300010',
    min_qty: 5,
    max_qty: 10,
    uom_id: 'CTN',
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
      const res = updateSalesORGCustomerGroupMaterial(
        reqBody.company_id as string,
        reqBody.sales_org_id as string,
        reqBody.customer_group_id as string,
        reqBody.product_id as string,
        reqBody,
      )
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createSalesORGCustomerGroupMaterial(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
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
    onChangeForm('sales_org_id', payload.sales_org_id)
    onChangeForm('customer_group_id', payload.customer_group_id)
    onChangeForm('product_id', payload.product_id)
    onChangeForm('min_qty', payload.min_qty)
    onChangeForm('max_qty', payload.max_qty)
    onChangeForm('uom_id', payload.uom_id)

    changePlaceHolder('sales_org_id', `${payload.sales_org_id} - ${payload.sales_org_name}`)
    changePlaceHolder(
      'customer_group_id',
      `${payload.customer_group_id} - ${payload.customer_group_name}`,
    )
    changePlaceHolder('product_id', `${payload.product_id} - ${payload.product_name}`)
    changePlaceHolder('min_qty', payload.min_qty)
    changePlaceHolder('max_qty', payload.max_qty)
    changePlaceHolder('uom_id', payload.uom_id)
  }, [isOnEditMode, payload])

  useEffect(() => {
    fieldUom(dataForm?.product_id).then((value) => {
      setOptionsUom(value)
    })
  }, [dataForm?.product_id])

  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Sales Org"
        required
        type="select"
        fetchOptions={fieldSalesOrganization}
        value={placeHolder?.sales_org_id ? placeHolder.sales_org_id : ''}
        disabled={isOnEditMode}
        onChange={(val: any) => {
          onChangeForm('sales_org_id', val.value)
          changePlaceHolder('sales_org_id', val.label)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Customer Group"
        required
        type="select"
        fetchOptions={fieldCustomerGroupCompany}
        value={placeHolder?.customer_group_id ? placeHolder.customer_group_id : ''}
        disabled={isOnEditMode}
        onChange={(val: any) => {
          onChangeForm('customer_group_id', val.value)
          changePlaceHolder('customer_group_id', val.label)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="SKU"
        required
        type="select"
        fetchOptions={fieldItem}
        value={placeHolder?.product_id ? placeHolder.product_id : ''}
        disabled={isOnEditMode}
        onChange={(val: any) => {
          onChangeForm('product_id', val.value)
          changePlaceHolder('product_id', val.label)
        }}
      />
      <Spacer size={10} />
      <Text
        variant="headingSmall"
        textAlign="center"
        style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
      >
        Min. Qty <span style={{ color: 'red' }}> *</span>
      </Text>
      <InputNumber
        required
        disabled={!placeHolder?.product_id}
        min={'0'}
        value={placeHolder?.min_qty ? placeHolder.min_qty?.toLocaleString() : '0'}
        onChange={(val) => {
          onChangeForm('min_qty', val)
          changePlaceHolder('min_qty', val)
        }}
        style={styleInputNumber}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="UoM"
        required
        type="select"
        options={optionUom}
        value={placeHolder?.uom_id ? placeHolder.uom_id : ''}
        disabled={!placeHolder?.product_id}
        onChange={(val: any) => {
          onChangeForm('uom_id', val.value)
          changePlaceHolder('uom_id', val.label)
        }}
      />
      <Spacer size={10} />
    </>
  )

  return (
    <>
      <Modal
        title={
          isOnEditMode
            ? 'View Detail Sales Organization, Customer Group, Material'
            : 'Sales Organization, Customer Group, Material'
        }
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
        content="Are you sure want to submit Sales Organization, Customer Group, Material?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/configuration-sales-organization-customer-group-material`)
        }}
        successContent={(res: any) =>
          'Sales Organization, Customer Group, Material has been successfully Updated'
        }
        successOkText="OK"
        width={432}
      />
    </>
  )
}
