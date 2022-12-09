import CreateColumns, { dataIndexWithSorter } from 'src/utils/createColumns'
import moment from 'moment'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { Button } from 'pink-lava-ui'
// import { PATH } from 'src/configs/menus'

export const columns = [
  CreateColumns('Material Document', 'material_document', true, (text) => <>{text}</>, 250),
  CreateColumns('Movement Type', 'movement_type_name', true, (text) => <>{text}</>, 200),
  CreateColumns('From', 'from_sloc', true, (text) => <>{text}</>, 100),
  CreateColumns('To', 'to_sloc', true, (text) => <>{text}</>, 100),
  CreateColumns(
    'Material Date',
    'material_date',
    true,
    (text) => <>{moment(text).format('DD-MM-YYYY')}</>,
    200,
  ),
  CreateColumns('No. Reference', 'no_reference', true),
  CreateColumns('Material', 'material_document', true),
  CreateColumns('Large', 'large', true),
  CreateColumns('Middle', 'middle', true),
  CreateColumns('Small', 'small', true),
  CreateColumns('No. Ref. Cancel', 'no_reference_cancel', true),
]
