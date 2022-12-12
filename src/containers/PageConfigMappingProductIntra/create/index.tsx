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

export default function CreateConfigurationCompany({ visible = false, close = () => {} }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const [placeHolder, setPlaceHolder] = useState<FormData>()

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

  const onClickSubmit = async () => {
    setConfirmModal(true)
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
    return doCreate(reqBody)
  }

  const handleCancel = () => {
    setConfirmModal(false)
    setPlaceHolder(undefined)
    close()
  }

  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Company"
        required
        type="select"
        fetchOptions={fieldUomList}
        onChange={(val: any) => {
          onChangeForm('uom', val.value)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Key"
        required
        type="input"
        onChange={(val: any) => {
          onChangeForm('uom', val.value)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Value"
        required
        type="input"
        onChange={(val: any) => {
          onChangeForm('uom', val.value)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Description"
        type="input"
        onChange={(val: any) => {
          onChangeForm('uom', val.value)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Console Group"
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
        title="Create Mapping Product Intra"
        open={visible}
        onOk={onClickSubmit}
        onCancel={handleCancel}
        content={content}
        loading={loading}
        cancelText="Cancel"
        okText="Submit"
      />
      <Modal
        title="Confirm Submit"
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => {
          setConfirmModal(false)
        }}
        content="Are you sure want to mapping product intra?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/configuration-mapping-product-intra`)
        }}
        successContent={(res: any) => 'Mapping product intra has been successfully Created'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
