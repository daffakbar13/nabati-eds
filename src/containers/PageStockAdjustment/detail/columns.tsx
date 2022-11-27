import CreateColumns from 'src/utils/createColumns'

export const columns = [
  CreateColumns('No', 'branch', true, (text, _, ind) => <>{ind + 1}</>, 75),
  CreateColumns(
    'Item',
    'product_id',
    true,
    (text, rec) => <>{`${text}-${rec.product_name}`}</>,
    350,
  ),

  CreateColumns('Qty Stock', 'stock_qty', true, (text) => <>{text}</>, 150),
  CreateColumns('UoM', 'stock_uom_id', true, (text) => <>{text}</>, 100),

  CreateColumns('Qty Physical', 'qty', true, (text) => <>{text}</>, 150),
  CreateColumns('UoM', 'uom_id', true, (text) => <>{text}</>, 100),

  CreateColumns('Qty Reference', 'base_qty', true, (text) => <>{text}</>, 150),
  CreateColumns('UoM', 'base_uom_id', true, (text) => <>{text}</>, 100),

  CreateColumns('Batch', 'batch', true, (text) => <>{text}</>, 100),
  CreateColumns('Remark', 'remarks', true, (text) => <>{text}</>),
]
