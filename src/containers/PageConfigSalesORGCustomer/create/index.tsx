import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { InputNumber } from 'antd'
import { fieldSalesOrganization, fieldUomList, fieldCustomer } from 'src/configs/fieldFetches'
import {
  updateSalesORGCustomer,
  createSalesORGCustomer,
} from 'src/api/logistic/config-salesorg-customer'
import { PATH } from 'src/configs/menus'

interface FormData {
  customer_id: string
  min_line: number
  min_qty: number
  uom: string
  min_amount: number
  status: string
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const [placeHolder, setPlaceHolder] = useState<FormData>()
  const isOnEditMode = !!payload

  const initialValue = {
    company_id: 'PP01',
    customer_id: '15',
    min_line: 5,
    min_qty: 10,
    uom: 'PCS',
    min_amount: 59091,
  }

  const styleInputNumber = {
    border: '1px solid #AAAAAA',
    borderRadius: 8,
    height: 46,
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
      const res = updateSalesORGCustomer(
        reqBody.company_id as string,
        reqBody.customer_id as string,
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
      const res = createSalesORGCustomer(reqBody)
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
    onChangeForm('customer_id', payload.customer_id)
    onChangeForm('min_line', payload.min_line)
    onChangeForm('min_qty', payload.min_qty)
    onChangeForm('uom', payload.uom)
    onChangeForm('min_amount', payload.min_amount)

    changePlaceHolder(
      'customer_id',
      `${payload.customer_id || ''} - ${payload.customer_name || ''}`,
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
        label="Customer ID"
        required
        type="select"
        fetchOptions={fieldCustomer}
        value={placeHolder?.customer_id ? placeHolder.customer_id : ''}
        disabled={isOnEditMode}
        onChange={(val: any) => {
          onChangeForm('customer_id', val.value)
          changePlaceHolder('customer_id', val.label)
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
          isOnEditMode ? 'View Detail Sales Organization, Customer' : 'Sales Organization, Customer'
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
        content="Are you sure want to submit Sales Organization, Customer?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/configuration-sales-organization-customer`)
        }}
        successContent={(res: any) => 'Sales Organization, Customer has been successfully Updated'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
