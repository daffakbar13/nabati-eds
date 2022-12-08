/* eslint-disable quotes */
import React from 'react'
import CustomerInfo from './CustomerInfo'
import DocumentFlow from './DocumentFlow'
import Quotation from './Quotation'
import SalesmanInfo from './SalesmanInfo'

const CreateTabs = (label: React.ReactNode, key: string, children: React.ReactNode) => ({
  label,
  key,
  children,
  forceRender: true,
  destroyInactiveTabPane: true,
})

const AllTabs = [CreateTabs(`Undelivered Shipment`, '1', '')]

export default AllTabs
