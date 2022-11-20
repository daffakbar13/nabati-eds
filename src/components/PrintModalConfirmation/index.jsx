import { useState } from 'react'

import { Button, Modal } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'

const PrintConfirmationModal = ({
  confirmationText = 'Are you sure want to print?',
  visible,
  close,
  componentToPrint = <p>Please provide components to print out</p>,
  cssString = '',
  ...props
}) => {
  const [loading, setLoading] = useState(false)

  const handlePrint = async (e) => {
    setLoading(true)
    const content = document.getElementById('printContent')
    const pri = document.getElementById('iFrameContent').contentWindow
    pri.document.open()
    pri.document.write(
      `<html>
                <head>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet">
                    <style>
                    p,
                    div {
                        margin: 0;
                        padding: 0;
                    }

                    * {
                        color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        font-family: 'Nunito Sans', sans-serif;
                        box-sizing: border-box;
                    }

                    @media print {
                        .pagebreak {
                            clear: both;
                            page-break-after: always;
                        }

                        .avoidBreak {
                            page-break-inside: avoid;
                        }
                    }

                    ${cssString}

                    </style>
                </head>
                <body>
                   ${content.innerHTML}
                </body>
            </html>`,
    )

    pri.document.close()
    pri.focus()
    pri.print()
    setLoading(false)
    close()
  }

  const onCancel = () => {
    setLoading(false)
    close()
  }

  return (
    <Modal
      closable={false}
      visible={visible}
      onCancel={onCancel}
      destroyOnClose
      footer={null}
      zIndex={1001}
      {...props}
    >
      <div className="flex items-center justify-center mb-2">
        <div className="text-3xl font-bold mb-1">
          <PrinterOutlined />
        </div>
        <div className="text-2xl font-bold ml-3">Print Document?</div>
      </div>
      <div className="text-center">{confirmationText}</div>
      {visible && (
        <div className="hidden">
          <div id="printContent">{componentToPrint}</div>
          <iframe
            title="WMS"
            id="iFrameContent"
            style={{ height: '0', width: '0', position: 'absolute' }}
          />
        </div>
      )}
      <div
        className="mt-5"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: 10,
        }}
      >
        <Button
          className="h-11 rounded-10 text-nabati-pink border-nabati-pink"
          onClick={close}
          type="ghost"
        >
          Cancel
        </Button>
        <Button className="h-11 rounded-10" onClick={handlePrint} type="primary" loading={loading}>
          Print
        </Button>
      </div>
    </Modal>
  )
}

export default PrintConfirmationModal
