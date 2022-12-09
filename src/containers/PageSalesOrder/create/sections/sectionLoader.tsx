import React from 'react'
import { Loader } from 'src/components'
import { useSalesSalesOrderCreateContext } from 'src/hooks/contexts'
import { useTableProduct } from '../columns'

export default function SectionLoader() {
  const {
    state: { processing, tableProduct },
  } = useSalesSalesOrderCreateContext()
  return (
    <>
      {(processing || tableProduct.isLoading) && (
        <Loader type="process" text={processing || 'Wait for get data products'} />
      )}
    </>
  )
}
