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
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createSalesORGCustomerGroupCustomerGroup(reqBody)
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

  const UoMOption = [
    { label: 'HG - High', value: 'HG' },
    { label: 'MD - Medium', value: 'MD' },
    { label: 'LW - Low', value: 'LW' },
  ]

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
        label="Channel"
        required
        type="select"
        fetchOptions={fieldChannelCompany}
        value={placeHolder?.channel_id ? placeHolder.channel_id : ''}
        disabled={isOnEditMode}
        onChange={(val: any) => {
          onChangeForm('channel_id', val.value)
          changePlaceHolder('channel_id', val.label)
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
        label="Salesman Group"
        required
        type="select"
        fetchOptions={fieldSalesmanGroup}
        value={placeHolder?.salesman_group_id ? placeHolder.salesman_group_id : ''}
        disabled={isOnEditMode}
        onChange={(val: any) => {
          onChangeForm('salesman_group_id', val.value)
          changePlaceHolder('salesman_group_id', val.label)
        }}
      />
      <Spacer size={10} />
      <Text
        variant="headingSmall"
        textAlign="center"
        style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
      >
        Min. Line <span style={{ color: 'red' }}> *</span>
      </Text>
      <InputNumber
        required
        disabled={isOnEditMode}
        min={'0'}
        value={placeHolder?.min_line ? placeHolder.min_line?.toLocaleString() : '0'}
        onChange={(val) => {
          onChangeForm('min_line', val)
          changePlaceHolder('min_line', val)
        }}
        style={styleInputNumber}
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
        options={UoMOption}
        value={placeHolder?.uom ? placeHolder.uom : ''}
        onChange={(val: any) => {
          onChangeForm('uom', val.value)
          changePlaceHolder('uom', val.label)
        }}
      />
      <Spacer size={10} />
      <Text
        variant="headingSmall"
        textAlign="center"
        style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
      >
        Min. Amount <span style={{ color: 'red' }}> *</span>
      </Text>
      <InputNumber
        required
        min={'0'}
        value={placeHolder?.min_amount ? placeHolder.min_amount?.toLocaleString() : '0'}
        onChange={(val) => {
          onChangeForm('min_amount', val)
          changePlaceHolder('min_amount', val)
        }}
        style={styleInputNumber}
      />
      <Spacer size={10} />
    </>
  )

  return (
    <>
      <Modal
        title={
          isOnEditMode
            ? 'View Detail Sales Organization, Channel, Customer Group, Salesman Group'
            : 'Sales Organization, Channel, Customer Group, Salesman Group'
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
        content="Are you sure want to submit Sales Organization, Channel, Customer Group, Salesman Group?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(
            `${PATH.LOGISTIC}/configuration-sales-organization-customer-group-salesman-grop`,
          )
        }}
        successContent={(res: any) =>
          'Sales Organization, Channel, Customer Group, Salesman Group has been successfully Updated'
        }
        successOkText="OK"
        width={432}
      />
    </>
  )
}
