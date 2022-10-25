/* eslint-disable quotes */
import React from 'react'

const CreateTabs = (label: React.ReactNode, key: string) => ({ label, key })

const AllTabs = [
    CreateTabs(`Delivery Order`, '1'),
    CreateTabs(`Document Flow`, '2'),
    CreateTabs(`Customer Info`, '3'),
    CreateTabs(`Salesman Info`, '4'),
]

export default AllTabs
