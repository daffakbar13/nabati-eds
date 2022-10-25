/* eslint-disable quotes */
import React from 'react'
import CustomerInfo from './CustomerInfo'
import DocumentFlow from './DocumentFlow'
import Quotation from './Quotation'
import SalesmanInfo from './SalesmanInfo'

const CreateTabs = (label: React.ReactNode, key: string) => ({label, key})

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
    CreateTabs(`Sales Order`, '1'),
    CreateTabs(`Pricing Condition`, '2'),
    CreateTabs(`Promotion List`, '3'),
    CreateTabs(`Document Flow`, '4'),
    CreateTabs(`Customer Info`, '5'),
    CreateTabs(`Salesman Info`, '6'),
]

export default AllTabs