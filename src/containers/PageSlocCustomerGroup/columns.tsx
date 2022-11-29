import CreateColumns from 'src/utils/createColumns'

export const columns = () => [
  CreateColumns('No', 'branch', true, (text, _, ind) => <>{ind + 1}</>, 75),
  CreateColumns(
    'Company',
    'company_id',
    true,
    (text, rec) => <>{`${text} - ${rec.company_name}`}</>,
    250,
  ),
  CreateColumns(
    'Company',
    'sales_org_id',
    true,
    (text, rec) => <>{`${text} - ${rec.sales_org_name}`}</>,
    250,
  ),
  CreateColumns(
    'Sloc',
    'from_sloc',
    true,
    (branch, rec) => <>{`${branch} - ${rec.from_sloc_name}`}</>,
    200,
  ),
]
