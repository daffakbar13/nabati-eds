import React, { useEffect, useState } from 'react'
import { Modal } from 'src/components'
import { Spacer, Text, Button } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import { useRouter } from 'next/router'
import { fieldSlocFromBranch, fieldSalesmanAll } from 'src/configs/fieldFetches'
import { createSlocman } from 'src/api/logistic/sloc-salesman'

export default function ModalCreate({ visible = false, close = () => {} }) {
  const router = useRouter()
  const [allSloc, setAllScloc] = React.useState([])
  const [dataForm, setDataForm] = React.useState({})
  const [newData, SetNewData] = React.useState()

  useEffect(() => {
    fieldSlocFromBranch('ZOP3', 'P104').then((response) => {
      setAllScloc(response)
    })
  }, [])

  const initialValue = {
    company_id: 'PP01',
    salesman_id: '130201',
    sloc_id: 'KV03',
    status: 1,
  }

  const onChangeForm = (form: string, value: any) => {
    setDataForm((old) => ({ ...old, ...{ [form]: value } }))
  }

  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Salesman"
        required
        type="select"
        fetchOptions={fieldSalesmanAll}
        onChange={(val: any) => {
          onChangeForm('salesman_id', val.value)
        }}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="SLoc"
        required
        type="select"
        options={allSloc}
        onChange={(val: any) => {
          onChangeForm('sloc_id', val.value)
        }}
      />
    </>
  )

  return (
    <>
      <Modal
        open={visible}
        onOk={() => {
          createSlocman({ ...initialValue, ...dataForm })
            .then((response) => SetNewData(response.data.id))
            .catch((e) => console.log(e))
        }}
        onCancel={() => {
          close()
        }}
        title="Create SLoc Salesman"
        content={content}
        cancelText="Cancel"
        okText="Submit"
      />
    </>
  )
}
