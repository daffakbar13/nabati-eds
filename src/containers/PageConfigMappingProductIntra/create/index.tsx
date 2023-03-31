import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { InputNumber } from 'antd'
import { fieldProductByCompany } from 'src/configs/fieldFetches'
import {
  updateProductIntraChannel,
  createProductIntraChannel,
} from 'src/api/logistic/config-mapping-product-intra'
import { PATH } from 'src/configs/menus'

interface FormData {
  company_id: string
  trans_type: string
  product_gt: string
  product_mt: string
  trans_id: string
  gt_id: string
}

export default function CreateConfigurationCompany({ visible = false, close = () => {}, payload }) {
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const router = useRouter()
  const [dataForm, setDataForm] = useState<FormData>()
  const [placeHolder, setPlaceHolder] = useState<FormData>()
  const isOnEditMode = !!payload
  const transtypeOptions = [
    {
      label: 'Channel',
      value: 'Channel',
    },
    {
      label: 'Channel_IDG',
      value: 'Channel_IDG',
    },
    {
      label: 'Sloc',
      value: 'Sloc',
    },
  ]

  const initialValue = { company_id: 'PP01' }

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
      const res = updateProductIntraChannel(
        reqBody.trans_id as string,
        reqBody.gt_id as string,
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
      const res = createProductIntraChannel(reqBody)
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
    close()
  }

  useEffect(() => {
    if (!isOnEditMode) return
    onChangeForm('trans_type', payload.trans_type)
    onChangeForm('product_gt', payload.product_gt)
    onChangeForm('product_mt', payload.product_mt)
    onChangeForm('trans_id', payload.trans_type)
    onChangeForm('gt_id', payload.product_gt)

    changePlaceHolder('trans_type', payload.trans_type)
    changePlaceHolder(
      'product_gt',
      `${payload.product_gt || ''} - ${payload.product_gt_name || ''}`,
    )
    changePlaceHolder(
      'product_mt',
      `${payload.product_mt || ''} - ${payload.product_mt_name || ''}`,
    )
  }, [isOnEditMode, payload])

  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Trans Type"
        required
        type="select"
        options={transtypeOptions}
        value={placeHolder?.trans_type || ''}
        onChange={(val: any) => {
          onChangeForm('trans_type', val.value)
          changePlaceHolder('trans_type', val.label)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Product GT"
        required
        type="select"
        fetchOptions={fieldProductByCompany}
        value={placeHolder?.product_gt || ''}
        onChange={(val: any) => {
          onChangeForm('product_gt', val.value)
          changePlaceHolder('product_gt', val.label)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Product MT"
        required
        type="select"
        fetchOptions={(search) => fieldProductByCompany(search, dataForm?.product_gt || '')}
        value={placeHolder?.product_mt || ''}
        onChange={(val: any) => {
          onChangeForm('product_mt', val.value)
          changePlaceHolder('product_mt', val.label)
        }}
      />
      <Spacer size={10} />
    </>
  )

  return (
    <>
      <Modal
        title={isOnEditMode ? 'View Mapping Product Intra' : 'Create Mapping Product Intra'}
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
        content={
          isOnEditMode
            ? 'Are you sure want to update mapping product intra?'
            : 'Are you sure want to submit mapping product intra?'
        }
        loading={loading}
        onOkSuccess={() => {
          handleCancel()
          router.push(`${PATH.LOGISTIC}/configuration-mapping-product-intra`)
        }}
        successContent={(res: any) => 'mapping product intra has been successfully Submited'}
        successOkText="OK"
        width={432}
      />
    </>
  )
}
