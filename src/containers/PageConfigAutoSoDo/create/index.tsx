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
  create_from: string
  partial_availability: number
  notes: string
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [valueRadio, setValueRadio] = useState(1)
  const [initialValue, setInitialValue] = useState<any>({ company_id: 'PP01' })
  const [dataForm, setDataForm] = useState<FormData>()

  const [placeHolder, setPlaceHolder] = useState<FormData>()
  const isOnEditMode = !!payload

  const optionsRadio = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ]

  const optionsCreateFrom = [
    { label: 'EDS', value: 'EDS' },
    { label: 'SFA', value: 'SFA' },
    { label: 'eMitra', value: 'eMitra' },
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
      const res = updateSOtoDO(reqBody, payload.create_from)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = CreateSOtoDO(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
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
    setValueRadio(payload.partial_availability)
    setPlaceHolder({
      company_id: payload.company_id,
      create_from: payload.create_from,
      partial_availability: payload.partial_availability,
      notes: payload.notes,
    })
    setInitialValue({
      company_id: payload.company_id,
      create_from: payload.create_from,
      partial_availability: payload.partial_availability,
      notes: payload.notes,
    })
  }, [isOnEditMode, payload])

  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Create From"
        required
        type="select"
        options={optionsCreateFrom}
        value={placeHolder?.create_from ? placeHolder.create_from : ''}
        onChange={(val: any) => {
          onChangeForm('create_from', val.value)
          changePlaceHolder('create_from', val.label)
        }}
      />
      <Spacer size={10} />
      <Text
        variant="headingSmall"
        textAlign="center"
        style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
      >
        Partial Avability ?
      </Text>
      <Radio.Group
        options={optionsRadio}
        value={valueRadio}
        onChange={(e: any) => {
          setValueRadio(e.target.value)
          onChangeForm('partial_availability', e.target.value)
          changePlaceHolder('partial_availability', e.target.value)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Notes"
        type="input"
        value={placeHolder?.notes ? placeHolder.notes : ''}
        onChange={(e: any) => {
          onChangeForm('notes', e.target.value)
          changePlaceHolder('notes', e.target.value)
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
        successContent={(res: any) =>
          isOnEditMode
            ? 'Auto SO to DO has been successfully Updated'
            : 'Auto SO to DO has been successfully Created'
        }
        successOkText="OK"
        width={432}
      />
    </>
  )
}
