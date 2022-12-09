import React from 'react'
import { Loader } from 'src/components'
import { useSalesQuotationCreateContext } from 'src/hooks/contexts'
import { useTableProduct } from '../columns'

export default function SectionLoader() {
  const {
    state: { processing, tableProduct },
  } = useSalesQuotationCreateContext()
  return (
    <>
      {(processing || tableProduct.isLoading) && (
        <Loader type="process" text={processing || 'Wait for get data items'} />
      )}
    </>
  )
}
