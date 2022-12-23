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

const AllTabs = [
  // {
  //     label: 'Quotation',
  //     key: 'Quotation',
  //     children: <Quotation />,
  // },
  // {
  //     label: 'Document Flow',
  //     key: 'Document Flow',
  //     children: <DocumentFlow />,
  // }, {
  //     label: 'Customer Info',
  //     key: 'Customer Info',
  //     children: <CustomerInfo />,
  // }, {
  //     label: 'Salesman Info',
  //     key: 'Salesman Info',
  //     children: <SalesmanInfo />,
  // },
  CreateTabs(`Quotation`, '1', ''),
  CreateTabs(`Document Flow`, '2', ''),
  CreateTabs(`Customer Info`, '3', ''),
  CreateTabs(`Salesman Info`, '4', ''),
]

export default AllTabs
