/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React from 'react'
import { useProformaInvoiceCreateProvider } from './states'

export default function ProformaInvoiceCreateProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const ProformaInvoice = useProformaInvoiceCreateProvider()

  return (
    <>
      <ProformaInvoice.Provider
        value={{
          state: { ...ProformaInvoice.state },
          handler: ProformaInvoice.handler,
        }}
      >
        {children}
      </ProformaInvoice.Provider>
    </>
  )
}
