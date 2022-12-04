import React from 'react'
import { getQuotation } from 'src/api/quotation'
import { useTable } from 'src/hooks'
import { useColumnQuotation } from './columns'
import { baseHandler, counterReducer, SalesQuotationListCtx, StateInterface } from './states'

export default function SalesQuotationListProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const table = useTable({
    funcApi: getQuotation,
    haveCheckbox: { headCell: 'status_name', member: ['New'] },
    columns: useColumnQuotation,
  })
  const initialValue: StateInterface = {
    submittedQuotation: [],
    table,
  }
  const [state, dispatch] = React.useReducer(counterReducer, initialValue)
  const handler = baseHandler(dispatch)

  return (
    <SalesQuotationListCtx.Provider value={{ state: { ...state, table }, handler }}>
      {children}
    </SalesQuotationListCtx.Provider>
  )
}
