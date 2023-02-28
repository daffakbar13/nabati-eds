import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, Text } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { fieldSalesmanAll, fieldSlocByConfigLogistic } from 'src/configs/fieldFetches'
import { updateSlocman, createSlocman } from 'src/api/logistic/sloc-salesman'
import { getDetailSalesmanDivision } from 'src/api/salesman-division'
import { PATH } from 'src/configs/menus'

const { Label, LabelRequired } = Text

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [allSloc, setAllScloc] = useState([])
  const [dataForm, setDataForm] = useState({})
  const [slocPlacholder, setslocPlacholder] = useState('')
  const [salesPlaceholder, setsalesPlaceholder] = useState('')
  const [branchSelected, setBranchSelected] = useState('')
  const isOnEditMode = !!payload

  const initialValue = {
    company_id: 'PP01',
    salesman_id: '130201',
    sloc_id: 'KV03',
    status: 1,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const onClickSubmit = async () => {
    setConfirmModal(true)
  }

  const doUpdate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = updateSlocman(reqBody.id as string, reqBody.id_sloc as string, reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const doCreate = async (reqBody: any) => {
    try {
      setLoading(true)
      const res = createSlocman(reqBody)
      setLoading(false)
      return res
    } catch (error) {
      return error
    }
  }

  const handleSubmit = async () => {
    setsalesPlaceholder('')
    setslocPlacholder('')
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
    setsalesPlaceholder('')
    setslocPlacholder('')
    close()
  }

  useEffect(() => {
    if (!isOnEditMode) return
    onChangeForm('id', payload.salesman_id)
    onChangeForm('id_sloc', payload.sloc_id)
    onChangeForm('salesman_id', payload.salesman_id)
    onChangeForm('sloc_id', payload.sloc_id)
    setsalesPlaceholder(`${payload.salesman_id} - ${payload.salesman_name}`)
    setslocPlacholder(payload.sloc_id)
    getDetailSalesmanDivision(payload.salesman_id).then((response) => {
      setBranchSelected(response?.data?.branch_id)
    })
  }, [isOnEditMode, payload])

  useEffect(() => {
    if (branchSelected != '') {
      fieldSlocByConfigLogistic(branchSelected).then((result) => {
        setAllScloc(result)
      })
    }
  }, [branchSelected])

  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Salesman"
        required
        type="select"
        fetchOptions={fieldSalesmanAll}
        value={salesPlaceholder}
        onChange={(val: any) => {
          onChangeForm('salesman_id', val.value)
          setsalesPlaceholder(val.label)
          setBranchSelected(val.key)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="SLoc"
        required
        type="select"
        options={allSloc}
        value={slocPlacholder}
        onChange={(val: any) => {
          onChangeForm('sloc_id', val.label.split(' - ')[0])
          setslocPlacholder(val.label)
        }}
      />
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Detail SLoc Salesman' : 'Create SLoc Salesman'}
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
        content="Are you sure want to submit SLoc Salesman?"
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/sloc-salesman`)
        }}
        successContent={(res: any) => 'SLoc Salesman has been successfully Updated'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
