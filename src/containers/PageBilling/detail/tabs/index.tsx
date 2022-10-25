/* eslint-disable quotes */
import React from 'react'

const CreateTabs = (label: React.ReactNode, key: string) => ({ label, key })

const AllTabs = [
    CreateTabs(`Billing`, '1'),
    CreateTabs(`Pricing Condition`, '2'),
    CreateTabs(`Document Flow`, '3'),
    CreateTabs(`Customer Info`, '4'),
    CreateTabs(`Salesman Info`, '5'),
]

export default AllTabs
