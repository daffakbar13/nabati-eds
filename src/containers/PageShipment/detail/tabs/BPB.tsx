/* eslint-disable camelcase */
import React from 'react'
import ReactToPrint from 'react-to-print'

interface BPBProps {}

export default function BPB(props: BPBProps) {
  const {} = props
  const componentRef = React.useRef()

  return (
    <>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>asdasd</div>
    </>
  )
}
