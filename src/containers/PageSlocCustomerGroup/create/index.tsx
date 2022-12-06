import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import {
  fieldCompanyList,
  fieldSalesOrgCompanyDynamic,
  fieldCustomerGroupCompanyDynamic,
  fieldSlocFromBranchCompanyDynamic,
} from 'src/configs/fieldFetches'
import {
  CreateCustomerGroup,
  updateCustomerGroup,
} from 'src/api/logistic/configuration-sloc-costumer-group'

const { Label, LabelRequired } = Text

interface FormData {
  company_id: string
  sales_org_id: string
  customer_group_id: string
  sloc_id: string
  status: number
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [allSloc, setAllScloc] = useState([])
  const [dataForm, setDataForm] = useState<FormData>()
  const [placeHolder, setPlaceHolder] = useState({
    company: '',
    sales_org: '',
    customerGroup: '',
    sloc: '',
  })
  const isOnEditMode = !!payload

  const initialValue = {
    company_id: 'PP01',
    sales_org_id: 'PID1',
    customer_group_id: '102',
    sloc_id: 'TR00',
    status: 1,
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
      const res = updateCustomerGroup(
        reqBody.id_sales_org as string,
        reqBody.id_customer_group as string,
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
      const res = CreateCustomerGroup(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      console.error(error)
    }
    return false
  }

  const handleSubmit = async () => {
    setPlaceHolder(undefined)
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
    setPlaceHolder(undefined)
    setDataForm(undefined)
    close()
  }

  useEffect(() => {
    if (!isOnEditMode) return
    onChangeForm('id_sales_org', payload.sales_org_id)
    onChangeForm('id_customer_group', payload.customer_group2_id)

    onChangeForm('company_id', payload.company_id)
    onChangeForm('sales_org_id', payload.sales_org_id)
    onChangeForm('customer_group_id', payload.customer_group2_id)
    onChangeForm('sloc_id', payload.sloc_id)
    setPlaceHolder({
      company: `${payload.company_id} - ${payload.company_name}`,
      sales_org: `${payload.sales_org_id} - ${payload.sales_org_name}`,
      customerGroup: `${payload.customer_group2_id} - ${payload.customer_group_name}`,
      sloc: payload.sloc_id,
    })
  }, [isOnEditMode, payload])

  useEffect(() => {
    console.log('data form : ', dataForm)
  }, [dataForm])

  useEffect(() => {
    fieldSlocFromBranchCompanyDynamic(dataForm?.company_id || 'PP01', 'ZOP3', 'P104').then(
      (response) => {
        setAllScloc(response)
      },
    )
  }, [dataForm?.company_id])

  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Company"
        required
        type="select"
        fetchOptions={fieldCompanyList}
        value={placeHolder?.company || ''}
        onChange={(val: any) => {
          onChangeForm('company_id', val.value)
          changePlaceHolder('company', val.label)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Sales Org"
        required
        type="select"
        fetchOptions={(search) => fieldSalesOrgCompanyDynamic(search, dataForm?.company_id || '')}
        value={placeHolder?.sales_org || ''}
        disabled={dataForm?.company_id ? false : true}
        onChange={(val: any) => {
          onChangeForm('sales_org_id', val.value)
          changePlaceHolder('sales_org', val.label)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Customer Group"
        required
        type="select"
        fetchOptions={(search) =>
          fieldCustomerGroupCompanyDynamic(search, dataForm?.company_id || '')
        }
        value={placeHolder?.customerGroup || ''}
        disabled={dataForm?.company_id ? false : true}
        onChange={(val: any) => {
          onChangeForm('customer_group_id', val.value)
          changePlaceHolder('customerGroup', val.label)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="SLoc"
        required
        type="select"
        options={allSloc}
        value={placeHolder?.sloc || ''}
        disabled={dataForm?.company_id ? false : true}
        onChange={(val: any) => {
          onChangeForm('sloc_id', val.value)
          changePlaceHolder('sloc', val.label)
        }}
      />
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Detail SLoc Customer Group' : 'Create SLoc Customer Group'}
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
        content="Are you sure want to submit SLoc Customer Group?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.reload()
        }}
        successContent={(res: any) => 'SLoc Customer Group has been successfully Updated'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
