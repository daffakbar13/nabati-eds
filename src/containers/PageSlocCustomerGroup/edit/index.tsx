import { Modal } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import { fakeApi } from 'src/api/fakeApi'
import DebounceSelect from 'src/components/DebounceSelect'

export default function ModalUpdate({
  visible = false,
  close = () => {},
  selectedData: any,
}) {
  const content = (
    <>
      <Spacer size={20} />
      <DebounceSelect
        label="Company"
        required
        type="select"
        fetchOptions={fakeApi}
        onChange={(val: any) => {}}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Sales Org"
        required
        type="select"
        fetchOptions={fakeApi}
        onChange={(val: any) => {}}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Customer Group"
        required
        type="select"
        fetchOptions={fakeApi}
        onChange={(val: any) => {}}
      />
      <Spacer size={10} />
      <DebounceSelect
        label="Sloc"
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
