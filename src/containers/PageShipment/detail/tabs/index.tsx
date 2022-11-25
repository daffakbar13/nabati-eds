/* eslint-disable quotes */
import React from 'react'

const CreateTabs = (label: React.ReactNode, key: string) => ({ label, key })

const AllTabs = [
  CreateTabs(`Document Header`, '1'),
  CreateTabs(`BPB`, '2'),
  CreateTabs(`BSTF`, '3'),
  CreateTabs(`HPH`, '4'),
]

export default AllTabs
