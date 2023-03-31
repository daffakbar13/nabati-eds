/* eslint-disable quotes */
import React from 'react'

const CreateTabs = (label: React.ReactNode, key: string) => ({ label, key })

const AllTabs = [CreateTabs(`DO STO`, '1'), CreateTabs(`Delivery Note`, '2')]

export default AllTabs
