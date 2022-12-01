import { Modal } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import { fakeApi } from 'src/api/fakeApi'
import DebounceSelect from 'src/components/DebounceSelect'

export default function ModalCreate({ visible = false, close = () => {} }) {
  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Salesman"
        required
        type="select"
        fetchOptions={fakeApi}
        onChange={(val: any) => {}}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="SLoc"
        required
        type="select"
        fetchOptions={fakeApi}
        onChange={(val: any) => {}}
      />
    </>
  )

  return (
    <>
      <Modal
        open={visible}
        onOk={() => {}}
        onCancel={close}
        title="Create SLoc Customer Group"
        content={content}
        cancelText="Cancel"
        okText="Submit"
      />
    </>
  )
}
