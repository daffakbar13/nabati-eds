/* eslint-disable quotes */
import React from 'react'

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
]

export default AllTabs
