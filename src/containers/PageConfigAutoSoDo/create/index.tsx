import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { Radio } from 'antd'
import { PATH } from 'src/configs/menus'

import { fieldSalesOrganization } from 'src/configs/fieldFetches'
import { CreateSOtoDO, updateSOtoDO } from 'src/api/logistic/configuration-auto-so-to-do'

interface FormData {
  company_id: string
  sales_org_id: string
  execute_do: number
  note: string
  status: number
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [valueRadio, setValueRadio] = useState(1)
  const [dataForm, setDataForm] = useState<FormData>()

  const [placeHolder, setPlaceHolder] = useState({
    company: '',
    sales_org: '',
    execute_do: 1,
    note: '',
  })
  const isOnEditMode = !!payload

  const initialValue = {
    company_id: 'PP01',
    sales_org_id: 'EVN5',
    execute_do: 1,
    note: '',
    status: 1,
  }

  const optionsRadio = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ]

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
      const res = updateSOtoDO(reqBody.id_sales_org as string, reqBody)
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
      const res = CreateSOtoDO(reqBody)
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

    onChangeForm('company_id', payload.company_id)
    onChangeForm('sales_org_id', payload.sales_org_id)
    onChangeForm('execute_do', payload.execute_do)
    onChangeForm('note', payload.note)
    setValueRadio(payload.execute_do)
    setPlaceHolder({
      company: `${payload.company_id} - ${payload.company_name}`,
      sales_org: `${payload.sales_org_id} - ${payload.sales_org_name}`,
      execute_do: payload.execute_do,
      note: payload.execute_do,
    })
  }, [isOnEditMode, payload])

  useEffect(() => {
    console.log('data form : ', dataForm)
  }, [dataForm])

  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Sales Org"
        required
        type="select"
        fetchOptions={fieldSalesOrganization}
        value={placeHolder?.sales_org ? placeHolder.sales_org : ''}
        onChange={(val: any) => {
          onChangeForm('sales_org_id', val.value)
          changePlaceHolder('sales_org', val.label)
        }}
      />
      <Spacer size={10} />
      <Text
        variant="headingSmall"
        textAlign="center"
        style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
      >
        Execute Do ?
      </Text>
      <Radio.Group
        options={optionsRadio}
        value={valueRadio}
        onChange={(e: any) => {
          setValueRadio(e.target.value)
          onChangeForm('execute_do', e.target.value)
          changePlaceHolder('execute_do', e.target.value)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Notes"
        type="input"
        value={dataForm?.note ? dataForm.note : ''}
        onChange={(e: any) => {
          onChangeForm('note', e.target.value)
        }}
      />
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Detail Auto SO to DO' : 'Create Auto SO to DO'}
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
        content="Are you sure want to submit Auto SO to DO?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/auto-so-to-do`)
        }}
        successContent={(res: any) => 'Auto SO to DO has been successfully Updated'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
