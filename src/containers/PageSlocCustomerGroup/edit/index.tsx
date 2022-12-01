import { Modal } from 'src/components'
import { Spacer } from 'pink-lava-ui'
import { fakeApi } from 'src/api/fakeApi'
import DebounceSelect from 'src/components/DebounceSelect'

type Props = {
  visible: boolean
  selectedUpdateData: any
  handleClose: () => void
}

export default function ModalUpdate(props: Props) {
  const handleClose = () => {
    props.handleClose()
  }

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
        open={props.visible}
        onOk={() => {}}
        onCancel={handleClose}
        title="Create SLoc Customer Group"
        content={content}
        cancelText="Cancel"
        okText="Submit"
      />
    </>
  )
}
